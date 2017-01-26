var BlockMap = require( '..' )
var assert = require( 'assert' )
var path = require( 'path' )
var fs = require( 'fs' )

describe( 'BlockMap.parse()', function() {

  context( 'compatibility', function() {
    BlockMap.versions.forEach( function( v ) {
      it( 'parses v' + v, function() {
        var json = require( `./data/version-${v}` )
        var xml = fs.readFileSync( path.join( __dirname, `/data/version-${v}.bmap` ), 'utf8' )
        assert.deepEqual( json, BlockMap.parse( xml ) )
      })
    })
  })

  context( 'when input is a string', function() {
    it( 'parses valid data', function() {
      var json = require( `./data/version-2.0` )
      var xml = fs.readFileSync( path.join( __dirname, `/data/version-2.0.bmap` ) )
      assert.deepEqual( json, BlockMap.parse( xml ) )
    })
  })

  context( 'when input is a buffer', function() {
    it( 'parses valid data', function() {
      var json = require( `./data/version-2.0` )
      var xml = fs.readFileSync( path.join( __dirname, `/data/version-2.0.bmap` ) )
      assert.deepEqual( json, BlockMap.parse( xml ) )
    })
  })

})
