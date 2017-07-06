const path = require( 'path' )
const fs = require( 'fs' )
const bench = require( 'nanobench' )
const BlockMap = require( '..' )

const ITERATIONS = 1000

bench( `BlockMap.parse() ⨉ ${ITERATIONS}`, function( run ) {

  const filename = path.join( __dirname, '..', 'test/data/version-2.0.bmap' )
  const bmap = fs.readFileSync( filename )
  var blockMap = null

  run.start()
  for( var i = 0; i < ITERATIONS; i++ ) {
    blockMap = BlockMap.parse( bmap )
  }
  run.end()

})
