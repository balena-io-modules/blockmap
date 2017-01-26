var BlockMap = require( '..' )
var assert = require( 'assert' )
var fs = require( 'fs' )
var path = require( 'path' )
var zlib = require( 'zlib' )

describe( 'BlockMap.ReadStream', function() {

  before( 'decompress', function( done ) {

    var source = path.join( __dirname, '/data/bmap.img.gz' )
    var destination = path.join( __dirname, '/data/bmap.img' )

    fs.createReadStream( source )
      .pipe( zlib.createGunzip() )
      .pipe( fs.createWriteStream( destination ) )
      .once( 'finish', done )

  })

  it( 'should read only mapped blocks', function( done ) {

    var filename = path.join( __dirname, '/data/bmap.img' )
    var blockMap = BlockMap.create( require( './data/version-2.0' ) )
    var readStream = new BlockMap.ReadStream( filename, blockMap )

    readStream.resume()
      .once( 'error', done )
      .once( 'end', function() {
        assert.equal( this.blocksRead, blockMap.mappedBlockCount, 'blocksRead mismatch' )
        assert.equal( this.bytesRead, blockMap.mappedBlockCount * blockMap.blockSize, 'bytesRead mismatch' )
        assert.equal( this.rangesRead, blockMap.ranges.length, 'rangesRead mismatch' )
        done()
      })

  })

})
