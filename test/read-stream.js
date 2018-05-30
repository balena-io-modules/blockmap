var BlockMap = require( '..' )
var assert = require( 'assert' )
var fs = require( 'fs' )
var path = require( 'path' )

describe( 'BlockMap.ReadStream', function() {

  it( 'should read only mapped blocks', function( done ) {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var readStream = new BlockMap.ReadStream( filename, blockMap )
    var byteCount = 0

    readStream
      .on( 'data', ( block ) => {
        byteCount += block.length
        assert.ok( block.position != null, 'block position missing' )
      })
      .once( 'error', done )
      .once( 'end', function() {
        assert.equal( this.blocksRead, blockMap.mappedBlockCount, 'blocksRead mismatch' )
        assert.equal( this.bytesRead, blockMap.mappedBlockCount * blockMap.blockSize, 'bytesRead mismatch' )
        assert.equal( this.rangesRead, blockMap.ranges.length, 'rangesRead mismatch' )
        assert.equal( this.rangesVerified, this.rangesRead, 'rangesRead mismatch' )
        assert.equal( byteCount / blockMap.blockSize, blockMap.mappedBlockCount, 'actual blocks read mismatch' )
        done()
      })

  })

  it( 'should generate range checksums', function( done ) {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var checksumlessBlockMap = BlockMap.create( require( './data/version-2.0' ) )
    checksumlessBlockMap.ranges.forEach((range) => {
      delete range.checksum
    })
    var readStream = new BlockMap.ReadStream( filename, checksumlessBlockMap, { verify: false, generateChecksums: true } )

    readStream
      .on( 'data', () => {})
      .once( 'error', done )
      .once( 'end', function() {
        assert.deepEqual( checksumlessBlockMap.ranges, blockMap.ranges, 'calculated checksums do not match the blockmap' )
        done()
      })

  })

  it( 'should position blocks correctly', function( done ) {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var readStream = new BlockMap.ReadStream( filename, blockMap )
    var blockCount = 0
    var firstBlock = true

    readStream
      .on( 'data', ( block ) => {
        blockCount += block.length / blockMap.blockSize
        assert.equal( block.length % blockMap.blockSize, 0, 'Invalid block size: ' + block.length )
        assert.ok( block.position != null, 'block position missing' )
        if( firstBlock ) {
          firstBlock = false
        } else {
          assert.ok( block.position > 0, 'block position is zero' )
        }
      })
      .once( 'error', done )
      .once( 'end', function() {
        assert.equal( this.rangesRead, blockMap.ranges.length, 'rangesRead mismatch' )
        assert.equal( blockCount, blockMap.mappedBlockCount, 'actual blocks read mismatch' )
        assert.equal( this.rangesVerified, this.rangesRead, 'rangesVerified mismatch' )
        done()
      })

  })

  it( 'should ignore path when given a file descriptor', function( done ) {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var fd = fs.openSync( filename, 'r' )
    var readStream = new BlockMap.ReadStream( null, blockMap, { fd: fd })
    var byteCount = 0

    readStream
      .on( 'data', ( block ) => {
        byteCount += block.length
        assert.ok( block.position != null, 'block position missing' )
      })
      .once( 'error', done )
      .once( 'end', function() {
        assert.equal( this.blocksRead, blockMap.mappedBlockCount, 'blocksRead mismatch' )
        assert.equal( this.bytesRead, blockMap.mappedBlockCount * blockMap.blockSize, 'bytesRead mismatch' )
        assert.equal( this.rangesRead, blockMap.ranges.length, 'rangesRead mismatch' )
        assert.equal( this.rangesVerified, this.rangesRead, 'rangesVerified mismatch' )
        assert.equal( byteCount / blockMap.blockSize, blockMap.mappedBlockCount, 'actual blocks read mismatch' )
        done()
      })

  })

  it( 'should not close the fd if autoClose = false', function( done ) {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var fd = fs.openSync( filename, 'r' )
    var byteCount = 0
    var readStream = new BlockMap.ReadStream( null, blockMap, {
      fd: fd,
      autoClose: false,
    })

    readStream
      .on( 'data', ( block ) => {
        byteCount += block.length
        assert.ok( block.position != null, 'block position missing' )
      })
      .once( 'error', done )
      .once( 'end', function() {
        assert.equal( this.blocksRead, blockMap.mappedBlockCount, 'blocksRead mismatch' )
        assert.equal( this.bytesRead, blockMap.mappedBlockCount * blockMap.blockSize, 'bytesRead mismatch' )
        assert.equal( this.rangesRead, blockMap.ranges.length, 'rangesRead mismatch' )
        assert.equal( this.rangesVerified, this.rangesRead, 'rangesVerified mismatch' )
        assert.equal( byteCount / blockMap.blockSize, blockMap.mappedBlockCount, 'actual blocks read mismatch' )
        assert.ok( fs.fstatSync( readStream.fd ) )
        fs.closeSync( readStream.fd )
        done()
      })

  })

  it( 'should not close if autoClose = false, and a filename was given', function( done ) {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var byteCount = 0
    var readStream = new BlockMap.ReadStream( filename, blockMap, {
      autoClose: false,
    })

    readStream
      .on( 'data', ( block ) => {
        byteCount += block.length
        assert.ok( block.position != null, 'block position missing' )
      })
      .once( 'error', done )
      .once( 'end', function() {
        assert.equal( this.blocksRead, blockMap.mappedBlockCount, 'blocksRead mismatch' )
        assert.equal( this.bytesRead, blockMap.mappedBlockCount * blockMap.blockSize, 'bytesRead mismatch' )
        assert.equal( this.rangesRead, blockMap.ranges.length, 'rangesRead mismatch' )
        assert.equal( this.rangesVerified, this.rangesRead, 'rangesVerified mismatch' )
        assert.equal( byteCount / blockMap.blockSize, blockMap.mappedBlockCount, 'actual blocks read mismatch' )
        assert.ok( fs.fstatSync( readStream.fd ) )
        fs.closeSync( readStream.fd )
        done()
      })

  })

  it( 'should start reading at `start`, if specified', function( done ) {

    var filename = path.join( __dirname, '/data/padded-bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var byteCount = 0
    var readStream = new BlockMap.ReadStream( filename, blockMap, {
      start: 4096,
    })

    readStream
      .on( 'data', ( block ) => {
        byteCount += block.length
        assert.ok( block.position != null, 'block position missing' )
      })
      .once( 'error', done )
      .once( 'end', function() {
        assert.equal( this.blocksRead, blockMap.mappedBlockCount, 'blocksRead mismatch' )
        assert.equal( this.bytesRead, blockMap.mappedBlockCount * blockMap.blockSize, 'bytesRead mismatch' )
        assert.equal( this.rangesRead, blockMap.ranges.length, 'rangesRead mismatch' )
        assert.equal( this.rangesVerified, this.rangesRead, 'rangesVerified mismatch' )
        assert.equal( byteCount / blockMap.blockSize, blockMap.mappedBlockCount, 'actual blocks read mismatch' )
        done()
      })

  })

  it( 'should stop reading at `end`, if specified', function( done ) {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var byteCount = 0
    var readStream = new BlockMap.ReadStream( filename, blockMap, {
      // This encompasses the first mapped range
      end: blockMap.blockSize * 2,
    })

    readStream
      .on( 'data', ( block ) => {
        byteCount += block.length
        assert.ok( block.position != null, 'block position missing' )
      })
      .once( 'error', done )
      .once( 'end', function() {
        assert.equal( this.blocksRead, 2, 'blocksRead mismatch' )
        assert.equal( this.bytesRead, blockMap.blockSize * 2, 'bytesRead mismatch' )
        assert.equal( this.rangesRead, 1, 'rangesRead mismatch' )
        assert.equal( this.rangesVerified, this.rangesRead, 'rangesVerified mismatch' )
        assert.equal( byteCount / blockMap.blockSize, 2, 'actual blocks read mismatch' )
        done()
      })

  })

  it( 'should start reading at `start` and stop reading at `end`, if specified', function( done ) {

    var filename = path.join( __dirname, '/data/padded-bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var byteCount = 0
    var readStream = new BlockMap.ReadStream( filename, blockMap, {
      start: 4096,
      end: 4096 + blockMap.blockSize,
    })

    readStream
      .on( 'data', ( block ) => {
        byteCount += block.length
        assert.ok( block.position != null, 'block position missing' )
      })
      .once( 'error', done )
      .once( 'end', function() {
        assert.equal( this.blocksRead, 2, 'blocksRead mismatch' )
        assert.equal( this.bytesRead, blockMap.blockSize * 2, 'bytesRead mismatch' )
        assert.equal( this.rangesRead, 1, 'rangesRead mismatch' )
        assert.equal( this.rangesVerified, this.rangesRead, 'rangesVerified mismatch' )
        assert.equal( byteCount / blockMap.blockSize, 2, 'actual blocks read mismatch' )
        done()
      })

  })

  it( 'should throw if start is negative', function() {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )

    assert.throws( function() {
      new BlockMap.ReadStream( filename, blockMap, {
        start: -1,
      })
    })

  })

  it( 'should throw if end is negative', function() {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )

    assert.throws( function() {
      new BlockMap.ReadStream( filename, blockMap, {
        end: -1,
      })
    })

  })

  it( 'should not emit blocks if end is 0', function( done ) {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var byteCount = 0
    var readStream = new BlockMap.ReadStream( filename, blockMap, {
      end: 0,
    })

    readStream
      .on( 'error', done )
      .on( 'end', () => {
        assert.strictEqual( byteCount, 0 )
        done()
      })
      .on( 'data', ( block ) => {
        byteCount += block.length
      })

  })

  it( 'should throw if start is greater than end', function() {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )

    assert.throws( function() {
      new BlockMap.ReadStream( filename, blockMap, {
        start: blockMap.blockSize,
        end: 0,
      })
    })

  })

  it( 'should not emit blocks if start is equal to end', function( done ) {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var byteCount = 0
    var readStream = new BlockMap.ReadStream( filename, blockMap, {
      start: blockMap.blockSize,
      end: blockMap.blockSize,
    })

    readStream
      .on( 'error', done )
      .on( 'end', () => {
        assert.strictEqual( byteCount, 0 )
        done()
      })
      .on( 'data', ( block ) => {
        byteCount += block.length
      })

  })

  it( 'should emit an error if start goes beyond the file', function( done ) {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var readStream = new BlockMap.ReadStream( filename, blockMap, {
      start: fs.statSync( filename ).size + blockMap.blockSize,
    })

    var hadError = false

    readStream
      .on( 'error', ( error ) => { done() })
      .on( 'end', () => {
        if( !hadError ) {
          done( new Error( 'Missing expected exception' ) )
        }
      })
      .on( 'data', () => {})

  })

  it( 'should ignore an end beyond the file', function( done ) {

    var filename = path.join( __dirname, 'data', 'bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var byteCount = 0
    var readStream = new BlockMap.ReadStream( filename, blockMap, {
      end: fs.statSync( filename ).size + blockMap.blockSize,
    })

    readStream
      .on( 'error', done )
      .on( 'end', function() {
        assert.equal( this.blocksRead, blockMap.mappedBlockCount, 'blocksRead mismatch' )
        assert.equal( this.bytesRead, blockMap.mappedBlockCount * blockMap.blockSize, 'bytesRead mismatch' )
        assert.equal( this.rangesRead, blockMap.ranges.length, 'rangesRead mismatch' )
        assert.equal( this.rangesVerified, this.rangesRead, 'rangesVerified mismatch' )
        assert.equal( byteCount / blockMap.blockSize, blockMap.mappedBlockCount, 'actual blocks read mismatch' )
        done()
      })
      .on( 'data', ( block ) => {
        byteCount += block.length
      })

  })

  context( 'disabled verification', function() {
    BlockMap.versions.forEach( function( v ) {
      it( `v${v}: ignore invalid ranges`, function( done ) {

        var filename = path.join( __dirname, 'data', 'bmap.img' )
        var bmapFile = path.join( __dirname, 'data', 'invalid', 'range', `multiple-${v}.bmap` )
        var blockMap = BlockMap.parse( fs.readFileSync( bmapFile, 'utf8' ) )
        var readStream = new BlockMap.ReadStream( filename, blockMap, { verify: false })

        readStream.resume()
          .on( 'error', done )
          .on( 'end', done )

      })
    })
  })

  context( 'single invalid range', function() {
    BlockMap.versions.forEach( function( v ) {
      it( `v${v}: detect an invalid range`, function( done ) {

        var filename = path.join( __dirname, 'data', 'bmap.img' )
        var bmapFile = path.join( __dirname, 'data', 'invalid', 'range', `version-${v}.bmap` )
        var blockMap = BlockMap.parse( fs.readFileSync( bmapFile, 'utf8' ) )
        var readStream = new BlockMap.ReadStream( filename, blockMap )
        var hadError = false

        readStream.resume()
          .on( 'error', function( error ) {
            assert.ok( error instanceof Error, 'error not instance of Error' )
            // The calculated checksum
            assert.ok( error.checksum, 'missing checksum' )
            // The faulty range's data
            assert.strictEqual( error.range.startLBA, 119, 'incorrect range start' )
            assert.strictEqual( error.range.endLBA, 133, 'incorrect range end' )
            assert.ok( error.range.checksum, 'missing "faulty" checksum' )
            hadError = true
          })
          .on( 'end', function() {
            var error = hadError === false ?
              new Error( 'Did not detect faulty range checksum' ) : null
            done( error )
          })

      })
    })
  })

  context( 'multiple invalid ranges', function() {
    BlockMap.versions.forEach( function( v ) {
      it( `v${v}: detect invalid ranges`, function( done ) {

        var filename = path.join( __dirname, 'data', 'bmap.img' )
        var bmapFile = path.join( __dirname, 'data', 'invalid', 'range', `multiple-${v}.bmap` )
        var blockMap = BlockMap.parse( fs.readFileSync( bmapFile, 'utf8' ) )
        var readStream = new BlockMap.ReadStream( filename, blockMap, { verify: true })
        var hadErrors = 0

        readStream.resume()
          .on( 'error', function( error ) {
            assert.ok( error instanceof Error, 'error not instance of Error' )
            assert.ok( /^Invalid checksum for range/.test( error.message ) )
            hadErrors++
          })
          .on( 'end', function() {
            assert.strictEqual( hadErrors, 3, 'not enough errors' )
            done()
          })

      })
    })
  })

})
