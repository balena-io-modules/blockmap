# blockmap
[![npm](https://img.shields.io/npm/v/blockmap.svg?style=flat-square)](https://npmjs.com/package/blockmap)
[![npm license](https://img.shields.io/npm/l/blockmap.svg?style=flat-square)](https://npmjs.com/package/blockmap)
[![npm downloads](https://img.shields.io/npm/dm/blockmap.svg?style=flat-square)](https://npmjs.com/package/blockmap)
[![build status](https://img.shields.io/travis/resin-io-modules/blockmap.svg?style=flat-square)](https://travis-ci.org/resin-io-modules/blockmap)

Tizen's block map format

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save blockmap
```

## Usage

```js
var BlockMap = require( 'blockmap' )
```

Parse a block map:

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
  checksumType: 'sha256',
  ranges: [{
    checksum: '9eaf19215d55d23de1be1fe4bed4a95bfe620a404352fd06e782738fff58e500',
    start: 0,
    end: 1
  }, {
    checksum: 'e8a26f49a71262870f8294a73f40f122d622fd70fb82bef01c0322785e9fd6b2',
    start: 3,
    end: 5
  }, {
    checksum: 'cb732fc3f3a0f81f6a761a534201c05549c8efe4a92630ccd24241f72d7d618c',
    start: 198,
    end: 199
  }]
}
```

Use a parsed block map to read only mapped regions:

```js
var blockMap = BlockMap.parse( fs.readFileSync( '/path/to/resin-os.bmap' ) )
var readStream = new BlockMap.ReadStream( '/path/to/resin-os.img', blockMap )

readStream.on( 'data', function( buffer ) {
  // The buffer will have two additional properties set;
  // 1) buffer.address – it's block address in respect to the .bmap's block size
  // 2) buffer.position – the block's offset (or address) in bytes
  // Which can then be used to write only those blocks to the target:
  fs.writeSync( fd, buffer, 0, buffer.length, buffer.position )
})

readStream.once( 'end', function() {
  console.log( 'Read', readStream.blocksRead, 'mapped blocks' )
  console.log( 'Read', readStream.bytesRead, 'mapped bytes' )
  console.log( 'Read', readStream.rangesRead, 'mapped ranges' )
})
```
