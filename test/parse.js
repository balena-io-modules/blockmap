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
    BlockMap.versions.forEach( function( v ) {
      it( 'parses v' + v, function() {
        var json = require( `./data/version-${v}` )
        var xml = fs.readFileSync( path.join( __dirname, `/data/version-${v}.bmap` ) )
        assert.deepEqual( json, BlockMap.parse( xml ) )
      })
    })
  })

  context( 'when input is a buffer', function() {
    BlockMap.versions.forEach( function( v ) {
      it( 'parses v' + v, function() {
        var json = require( `./data/version-${v}` )
        var xml = fs.readFileSync( path.join( __dirname, `/data/version-${v}.bmap` ) )
        assert.deepEqual( json, BlockMap.parse( xml ) )
      })
    })
  })

  context( 'when file checksum is invalid', function() {

    // NOTE: Version 1.2 has no support for file checksums
    ;[ '1.3', '1.4', '2.0' ].forEach( function( v ) {
      it( `throws on invalid checksum for v${v}`, function() {
        var json = require( `./data/version-${v}` )
        var xml = fs.readFileSync( path.join( __dirname, `/data/invalid/file-checksum/version-${v}.bmap` ) )
        assert.throws( function() {
          BlockMap.parse( xml )
        }, /^Error: File checksum mismatch:/, `Version ${v}` )
      })
    })

    // NOTE: Version 1.2 has no support for file checksums
    ;[ '1.3', '1.4', '2.0' ].forEach( function( v ) {
      it( `does not throw with verification disabled for v${v}`, function() {
        var json = require( `./data/version-${v}` )
        var xml = fs.readFileSync( path.join( __dirname, `/data/invalid/file-checksum/version-${v}.bmap` ) )
        assert.deepEqual( json, BlockMap.parse( xml, { verify: false }), `Version ${v}` )
      })
    })

  })

})
