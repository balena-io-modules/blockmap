var BlockMap = require( '..' )
var assert = require( 'assert' )
var fs = require( 'fs' )

describe( 'BlockMap.fromJSON()', function() {

  context( 'compatibility', function() {
    BlockMap.versions.forEach( function( v ) {
      it( 'inits from v' + v + ' JSON data', function() {
        var filename = `./data/version-${v}`
        var data = require( filename )
        var json = fs.readFileSync( require.resolve( filename ), 'utf8' )
        assert.deepEqual( data, BlockMap.fromJSON( json ) )
      })
    })
  })

})

describe( 'BlockMap.create()', function() {

  context( 'compatibility', function() {
    BlockMap.versions.forEach( function( v ) {
      it( 'inits from v' + v + ' JSON data', function() {
        var filename = `./data/version-${v}`
        var data = require( filename )
        assert.deepEqual( data, BlockMap.create( data ) )
      })
    })
  })

})
