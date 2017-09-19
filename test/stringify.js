var BlockMap = require( '..' )
var assert = require( 'assert' )
var path = require( 'path' )
var fs = require( 'fs' )

describe( 'BlockMap.stringify()', function() {

  it( 'can generate a 2.0 bmap xml file', function() {
    var json = require( `./data/version-2.0` )
    var xml = fs.readFileSync( path.join( __dirname, 'data', `version-2.0.bmap` ) )
    var compare = fs.readFileSync( path.join( __dirname, 'data', `stringified.bmap` ), 'utf8' )
    var blockMap = BlockMap.parse( xml )
    assert.deepEqual( json, BlockMap.parse( xml ) )
    assert.strictEqual( blockMap.toString(), compare )
  })

  it( 'has equivalent input & output', function() {
    var xml = fs.readFileSync( path.join( __dirname, 'data', `stringified.bmap` ) )
    var blockMap = BlockMap.parse( xml )
    assert.deepEqual( xml.toString(), blockMap.toString() )
  })

})
