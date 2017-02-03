var BlockMap = require( '..' )
var assert = require( 'assert' )
var fs = require( 'fs' )
var path = require( 'path' )

describe( 'BlockMap.FilterStream', function() {

  it( 'should only emit mapped blocks', function( done ) {

    var filename = path.join( __dirname, '/data/bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var readStream = fs.createReadStream( filename )
    var transform = new BlockMap.FilterStream( blockMap )
    var blockCount = 0

    readStream.pipe( transform )
      .on( 'data', ( block ) => {
        blockCount++
        assert.ok( block.address != null, 'block address missing' )
        assert.ok( block.position != null, 'block position missing' )
      })
      .once( 'error', done )
      .once( 'end', function() {
        assert.equal( this.blocksWritten, blockMap.mappedBlockCount, 'blocksRead mismatch' )
        assert.equal( this.bytesWritten, blockMap.mappedBlockCount * blockMap.blockSize, 'bytesWritten mismatch' )
        assert.equal( this.rangesRead, blockMap.ranges.length, 'rangesRead mismatch' )
        assert.equal( blockCount, blockMap.mappedBlockCount, 'actual blocks read mismatch' )
        done()
      })

  })

  context( 'disabled verification', function() {
    BlockMap.versions.forEach( function( v ) {
      it( `v${v}: ignore invalid ranges`, function( done ) {

        var filename = path.join( __dirname, '/data/bmap.img' )
        var bmapFile = path.join( __dirname, `/data/invalid/range/multiple-${v}.bmap` )
        var blockMap = BlockMap.parse( fs.readFileSync( bmapFile, 'utf8' ) )
        var readStream = fs.createReadStream( filename )
        var transform = new BlockMap.FilterStream( blockMap, { verify: false })

        readStream.pipe( transform ).resume()
          .on( 'error', done )
          .on( 'end', done )

      })
    })
  })

  context( 'single invalid range', function() {
    BlockMap.versions.forEach( function( v ) {
      it( `v${v}: detect an invalid range`, function( done ) {

        var filename = path.join( __dirname, '/data/bmap.img' )
        var bmapFile = path.join( __dirname, `/data/invalid/range/version-${v}.bmap` )
        var blockMap = BlockMap.parse( fs.readFileSync( bmapFile, 'utf8' ) )
        var readStream = fs.createReadStream( filename )
        var transform = new BlockMap.FilterStream( blockMap )

        readStream.pipe( transform ).resume()
          .on( 'error', function( error ) {
            assert.ok( error instanceof Error, 'error not instance of Error' )
            // The calculated checksum
            assert.ok( error.checksum, 'missing checksum' )
            // The faulty range's data
            assert.strictEqual( error.range.start, 119, 'incorrect range start' )
            assert.strictEqual( error.range.end, 133, 'incorrect range end' )
            assert.ok( error.range.checksum, 'missing "faulty" checksum' )
            done()
          })
          .on( 'end', function() {
            done( new Error( 'Did not detect faulty range checksum' ) )
          })

      })
    })
  })

  context( 'multiple invalid ranges', function() {
    BlockMap.versions.forEach( function( v ) {
      it( `v${v}: detect invalid ranges`, function( done ) {

        var filename = path.join( __dirname, '/data/bmap.img' )
        var bmapFile = path.join( __dirname, `/data/invalid/range/multiple-${v}.bmap` )
        var blockMap = BlockMap.parse( fs.readFileSync( bmapFile, 'utf8' ) )
        var readStream = fs.createReadStream( filename )
        var transform = new BlockMap.FilterStream( blockMap, { verify: true })
        var hadErrors = 0

        readStream.pipe( transform ).resume()
          .on( 'error', function( error ) {
            assert.ok( error instanceof Error, 'error not instance of Error' )
            assert.ok( /^Invalid checksum for range/.test( error.message ) )
            hadErrors++
            // NOTE: Because readable streams unpipe themselves if the dest
            // experiences an error, and there's no way to turn that off,
            // we have to re-pipe in the error handler to continue reading.
            // For details, see https://github.com/nodejs/node/blob/master/lib/_stream_readable.js#L572-L583
            readStream.pipe( transform )
          })
          .on( 'end', function() {
            assert.strictEqual( hadErrors, 3, 'not enough errors' )
            done()
          })

      })
    })
  })

})
