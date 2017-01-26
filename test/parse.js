var BlockMap = require( '..' )
var assert = require( 'assert' )
var path = require( 'path' )
var fs = require( 'fs' )

describe( 'BlockMap', function() {

  describe( '.parse()', function() {

    BlockMap.versions.forEach( function( v ) {
      it( 'should parse version ' + v, function() {
        var json = require( `./data/version-${v}` )
        var xml = fs.readFileSync( path.join( __dirname, `./data/version-${v}.bmap` ), 'utf8' )
        assert.deepEqual( json, BlockMap.parse( xml ) )
      })
    })

  })

})
