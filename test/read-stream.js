var BlockMap = require( '..' )
var assert = require( 'assert' )
var fs = require( 'fs' )
var path = require( 'path' )

describe( 'BlockMap.ReadStream', function() {

  it( 'should read only mapped blocks', function( done ) {

    var filename = path.join( __dirname, '/data/bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var readStream = new BlockMap.ReadStream( filename, blockMap )
    var blockCount = 0

    readStream
      .on( 'data', ( block ) => {
        blockCount++
        assert.ok( block.address != null, 'block address missing' )
        assert.ok( block.position != null, 'block position missing' )
      })
      .once( 'error', done )
      .once( 'end', function() {
        assert.equal( this.blocksRead, blockMap.mappedBlockCount, 'blocksRead mismatch' )
        assert.equal( this.bytesRead, blockMap.mappedBlockCount * blockMap.blockSize, 'bytesRead mismatch' )
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

        var filename = path.join( __dirname, '/data/bmap.img' )
        var bmapFile = path.join( __dirname, `/data/invalid/range/version-${v}.bmap` )
        var blockMap = BlockMap.parse( fs.readFileSync( bmapFile, 'utf8' ) )
        var readStream = new BlockMap.ReadStream( filename, blockMap )
        var hadError = false

        readStream.resume()
          .on( 'error', function( error ) {
            assert.ok( error instanceof Error, 'error not instance of Error' )
            // The calculated checksum
            assert.ok( error.checksum, 'missing checksum' )
            // The faulty range's data
            assert.strictEqual( error.range.start, 119, 'incorrect range start' )
            assert.strictEqual( error.range.end, 133, 'incorrect range end' )
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

        var filename = path.join( __dirname, '/data/bmap.img' )
        var bmapFile = path.join( __dirname, `/data/invalid/range/multiple-${v}.bmap` )
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
