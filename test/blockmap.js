var BlockMap = require( '..' )
var assert = require( 'assert' )
var fs = require( 'fs' )
var path = require( 'path' )
var zlib = require( 'zlib' )

before( 'decompress:bmap.img', function( done ) {

  var source = path.join( __dirname, '/data/bmap.img.gz' )
  var destination = path.join( __dirname, '/data/bmap.img' )

  fs.createReadStream( source )
    .pipe( zlib.createGunzip() )
    .pipe( fs.createWriteStream( destination ) )
    .once( 'finish', done )

})

before( 'decompress:padded-bmap.img', function( done ) {

  var source = path.join( __dirname, '/data/padded-bmap.img.gz' )
  var destination = path.join( __dirname, '/data/padded-bmap.img' )

  fs.createReadStream( source )
    .pipe( zlib.createGunzip() )
    .pipe( fs.createWriteStream( destination ) )
    .once( 'finish', done )

})

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
