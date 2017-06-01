const path = require( 'path' )
const fs = require( 'fs' )
const bench = require( 'nanobench' )
const BlockMap = require( '..' )

bench( 'fs.ReadStream', function( run ) {

  const filename = path.join( __dirname, '..', 'test/data/bmap.img' )
  const readStream = fs.createReadStream( filename )

  run.start()

  readStream.on( 'readable', function() {
    var chunk = null
    while( chunk = this.read() ) {
      continue
    }
  })
  .once( 'end', function() {
    run.end()
  })

})

bench( 'BlockMap.ReadStream', function( run ) {

  const filename = path.join( __dirname, '..', 'test/data/bmap.img' )
  const blockMap = BlockMap.create( require( '../test/data/version-2.0' ) )
  const readStream = BlockMap.createReadStream( filename, blockMap )

  run.start()

  readStream.on( 'readable', function() {
    var chunk = null
    while( chunk = this.read() ) {
      continue
    }
  })
  .once( 'end', function() {
    run.end()
  })

})

bench( 'BlockMap.FilterStream', function( run ) {

  const filename = path.join( __dirname, '..', 'test/data/bmap.img' )
  const blockMap = BlockMap.create( require( '../test/data/version-2.0' ) )
  const readStream = fs.createReadStream( filename )
  const filter = BlockMap.createFilterStream( blockMap )

  run.start()

  readStream.pipe( filter )
    .on( 'readable', function() {
      var chunk = null
      while( chunk = this.read() ) {
        continue
      }
    })
    .once( 'end', function() {
      run.end()
    })

})
