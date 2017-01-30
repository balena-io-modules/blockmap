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

})
