var xml = require( 'xml' )
var crypto = require( 'crypto' )

/**
 * Calculate the bmap file's checksum and inject it
 * @private
 * @param {String} bmap - xml string bmap
 * @param {BlockMap} blockMap – BlockMap instance
 * @returns {String} bmap
 */
function injectChecksum( bmap, blockMap ) {

  var checksum = blockMap.checksum || ''
  var zerofill = xml({ BmapFileChecksum: checksum.replace( /./g, '0' ) })
  var value = bmap.replace( xml({ BmapFileChecksum: checksum }), zerofill )
  var digest = crypto.createHash( blockMap.checksumType )
    .update( value ).digest( 'hex' )

  return value.replace( zerofill, xml({ BmapFileChecksum: digest }) )

}

/**
 * Stringify a block map into .bmap format
 * @memberOf BlockMap
 * @param {BlockMap} blockMap - BlockMap instance
 * @returns {String} xml
 */
function stringify( blockMap ) {

  var ranges = blockMap.ranges.map( function( range ) {

    var blockRange = range.start !== range.end ?
      range.start + '-' + range.end :
      range.start

    return {
      Range: [ { _attr: { chksum: range.checksum } }, blockRange ]
    }

  })

  var data = {
    bmap: [
      { _attr: { version: '2.0' } },
      { ImageSize: blockMap.imageSize },
      { BlockSize: blockMap.blockSize },
      { BlocksCount: blockMap.blockCount },
      { MappedBlocksCount: blockMap.mappedBlockCount },
      { ChecksumType: blockMap.checksumType },
      { BmapFileChecksum: blockMap.checksum },
      { BlockMap: ranges }
    ]
  }

  var bmap = xml([ data ], {
    declaration: true,
    encoding: 'utf-8',
    indent: '  ',
  }) + '\n'

  return injectChecksum( bmap, blockMap )

}

module.exports = stringify
