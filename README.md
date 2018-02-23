# Blockmap
[![npm](https://img.shields.io/npm/v/blockmap.svg?style=flat-square)](https://npmjs.com/package/blockmap)
[![npm license](https://img.shields.io/npm/l/blockmap.svg?style=flat-square)](https://npmjs.com/package/blockmap)
[![npm downloads](https://img.shields.io/npm/dm/blockmap.svg?style=flat-square)](https://npmjs.com/package/blockmap)
[![build status](https://img.shields.io/travis/resin-io-modules/blockmap/master.svg?style=flat-square&label=linux)](https://travis-ci.org/resin-io-modules/blockmap)
[![build status](https://img.shields.io/appveyor/ci/resin-io/blockmap/master.svg?style=flat-square&label=windows)](https://ci.appveyor.com/project/resin-io/blockmap)

This module implements [Tizen's block map format](https://source.tizen.org/documentation/reference/bmaptool/introduction),
which maps non-empty blocks or block ranges from a raw image file,
making it possible to quickly & efficiently flash the image to the target block device
by only reading & writing the necessary blocks.

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save blockmap
```

## Usage

For detailed API documentation, see [`/doc`](https://github.com/resin-io-modules/blockmap/tree/master/doc).

```js
var BlockMap = require( 'blockmap' )
```

### Parsing a Block Map

```
var blockMap = BlockMap.parse( xml )
```

```js
BlockMap {
  version: '2.0',
  imageSize: 821752,
  blockSize: 4096,
  blockCount: 201,
  mappedBlockCount: 117,
  checksum: '44e9d58de533d5eb94f8232cff22b2e6d71b15d369c2ac2af461c63164cce324',
  checksumType: 'sha256',
  ranges: [{
    checksum: '9eaf19215d55d23de1be1fe4bed4a95bfe620a404352fd06e782738fff58e500',
    start: 0,
    end: 1
  }, {
    checksum: 'e8a26f49a71262870f8294a73f40f122d622fd70fb82bef01c0322785e9fd6b2',
    start: 3,
    end: 5
  },
  // More ranges omitted for brevity
  {
    checksum: 'cb732fc3f3a0f81f6a761a534201c05549c8efe4a92630ccd24241f72d7d618c',
    start: 198,
    end: 199
  }]
}
```

### Creating a Block Map

Render a `.bmap` file from a parsed or otherwise constructed `BlockMap`:

```js
var blockMap = BlockMap.parse( value )
var xml = blockMap.toString()
```

Where `xml` would look like the following, given the block map from above:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bmap version="2.0">
  <ImageSize>821752</ImageSize>
  <BlockSize>4096</BlockSize>
  <BlocksCount>201</BlocksCount>
  <MappedBlocksCount>117</MappedBlocksCount>
  <ChecksumType>sha256</ChecksumType>
  <BmapFileChecksum>44e9d58de533d5eb94f8232cff22b2e6d71b15d369c2ac2af461c63164cce324</BmapFileChecksum>
  <BlockMap>
    <Range chksum="9eaf19215d55d23de1be1fe4bed4a95bfe620a404352fd06e782738fff58e500">0-1</Range>
    <Range chksum="e8a26f49a71262870f8294a73f40f122d622fd70fb82bef01c0322785e9fd6b2">3-5</Range>
    <!-- More ranges omitted for brevity -->
    <Range chksum="cb732fc3f3a0f81f6a761a534201c05549c8efe4a92630ccd24241f72d7d618c">198-199</Range>
  </BlockMap>
</bmap>
```

---

**NOTE:** Regardless of input version, `blockMap.toString()` will always
create a `.bmap` in the format of the latest version (currently `2.0`).

---

### Block Map Checksum Verification

By default, checksums for mapped ranges and the bmap file itself (only version 1.3+)
will be verified when parsing or streaming. If you need to disable verification,
pass `verify: false` in the options:

```js
// Disable verification of the bmap file checksum:
var blockMap = BlockMap.parse( bmap, { verify: false })
```

```js
// Disable range checksum verification:
var blockReadStream = BlockMap.createReadStream( '/path/to/resin-os.img', blockMap, {
  verify: false,
})
```

```js
// Same for filter streams:
var filterStream = BlockMap.createFilterStream( blockMap, {
  verify: false,
})
```

### Reading Mapped Blocks

---

**NOTE:** These examples just use `fs.writeSync()` in `.on('readable')` for brevity;
of course this should be implemented properly in a writable stream, which the readable
side (i.e. the `BlockMap.ReadStream` or `.FilterStream`) is piped to.

---

Use a parsed block map to read only mapped regions:

```js
var blockMap = BlockMap.parse( fs.readFileSync( '/path/to/resin-os.bmap' ) )
var blockReadStream = new BlockMap.ReadStream( '/path/to/resin-os.img', blockMap )

// The chunk emitted will have two properties set;
// 1) chunk.buffer – the data buffer
// 2) chunk.position – the chunk's offset (or address) in bytes
// Which can then be used to write only those blocks to the target:
blockReadStream.on( 'readable', function() {
  var chunk = null
  while( chunk = this.read() ) {
    fs.writeSync( fd, chunk.buffer, 0, chunk.buffer.length, chunk.position )
  }
})

blockReadStream.once( 'end', function() {
  console.log( 'Read', blockReadStream.blocksRead, 'mapped blocks' )
  console.log( 'Read', blockReadStream.bytesRead, 'mapped bytes' )
  console.log( 'Read', blockReadStream.rangesRead, 'mapped ranges' )
})
```

### Filtering Unmapped Blocks

Use a filter transform to filter out unmapped blocks from a stream:

```js
var blockMap = BlockMap.parse( fs.readFileSync( '/path/to/resin-os.bmap' ) )
var readStream = fs.createReadStream( '/path/to/resin-os.img' )
var filterStream = new BlockMap.FilterStream( blockMap )

// The chunk emitted will have two properties set;
// 1) chunk.buffer – the data buffer
// 2) chunk.position – the chunk's offset (or address) in bytes
// Which can then be used to write only those blocks to the target:
filterStream.on( 'readable', function() {
  var buffer = null
  while( chunk = this.read() ) {
    fs.writeSync( fd, chunk.buffer, 0, chunk.buffer.length, chunk.position )
  }
})

// Pipe the readable stream into the block filter:
readStream.pipe( filterStream )
```

## Verifying a Flashed Device

Use a `BlockMap.ReadStream` to verify a flashed device image:

```js
function verify( devicePath, blockMap, callback ) {
  new BlockMap.ReadStream( devicePath, blockMap ).resume()
    .once( 'error', callback )
    .once( 'end', callback )
}

var blockMap = BlockMap.parse( fs.readFileSync( '/path/to/resin-os.bmap' ) )

verify( '/dev/rdisk4', blockMap, function( error ) {
  if( error != null ) {
    // The image didn't verify...
  }
})
```

### Handling Errors

#### Parsing

`BlockMap.parse()` and `blockMap.parse()` will throw when
encountering invalid input, or if the checksum doesn't verify:

```js
try {
  blockMap = BlockMap.parse( value ) // OR
  blockMap.parse( value )
} catch( error ) {
  // ...
}
```

#### Streams

If the error is due to a checksum mismatch,
the error will have a `.checksum` and `.range` property,
denoting the calculated checksum, and the range for which it occured:

```js
var blockReadStream = new BlockMap.ReadStream( '/path/to/resin-os.img', blockMap )

blockReadStream.on( 'error', function( error ) {
  if( error.checksum ) {
    console.log( `Checksum mismatch for range [${error.range.start},${error.range.end}]:` )
    console.log( `${error.checksum} != ${error.range.checksum}` )
  }
  // ...
})
```

## References

- [Tizen's block map format](https://source.tizen.org/documentation/reference/bmaptool/introduction)
- [intel/bmap-tools](https://github.com/intel/bmap-tools)
