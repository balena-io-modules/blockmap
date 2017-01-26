var BlockMap = require( './blockmap' )
var htmlparser = require( 'htmlparser2' )

/**
 * Get the first tag of given name from a collection of nodes
 * @private
 * @param {String} name
 * @param {Array} nodes
 * @return {Object} node
 */
function firstChild( name, nodes ) {
  name = name.toLowerCase()
  return nodes.find( function( node ) {
    return node.type === 'tag' &&
      name === node.name.toLowerCase()
  })
}

/**
 * Get the text content of a node recursively
 * @private
 * @param {Object} node
 * @return {String}
 */
function getText( node ){
  if( Array.isArray( node ) ) return node.map( getText ).join( '' )
  if( node.type === 'tag' || node.type === 'cdata' ) return getText( node.children )
  if( node.type === 'text' ) return node.data
  return ''
}

/**
 * Get the trimmed text content of a node
 * @private
 * @param {String} name
 * @param {Array} nodes
 * @return {String}
 */
function textContent( name, nodes ) {
  var node = firstChild( name, nodes )
  return node ? getText( node ).trim() : null
}

/**
 * Extract the block ranges from the DOM
 * @private
 * @param {Object} map
 * @return {Array}
 */
function getRanges( map ) {

  var node = null
  var parts = null
  var ranges = []

  for( var i = 0; i < map.children.length; i++ ) {
    node = map.children[i]
    if( node.type === 'tag' && node.name.toLowerCase() === 'range' ) {
      parts = getText( node ).trim().split( '-' )
      ranges.push({
        checksum: node.attribs.sha1 || node.attribs.chksum,
        start: +parts[0],
        end: +( parts[1] || parts[0] )
      })
    }
  }

  return ranges

}

/**
 * Parse a .bmap file
 * @memberOf BlockMap
 * @param {String|Buffer} value
 * @param {BlockMap} blockMap
 * @return {BlockMap}
 */
function parse( value, blockMap ) {

  blockMap = blockMap || new BlockMap()

  var handler = new htmlparser.DomHandler({
    normalizeWhitespace: true,
  })

  var parser = new htmlparser.Parser( handler, {
    xmlMode: true,
  })

  parser.write( value )
  parser.end()

  var bmap = firstChild( 'bmap', handler.dom )
  if( bmap == null ) {
    throw new SyntaxError( 'Invalid block map: Missing bmap tag' )
  }

  blockMap.version = bmap.attribs && bmap.attribs.version

  if( !BlockMap.versions.includes( blockMap.version ) ) {
    throw new Error( 'Unsupported block map version "' + blockMap.version + '"' )
  }

  blockMap.imageSize = +textContent( 'ImageSize', bmap.children )
  blockMap.blockSize = +textContent( 'BlockSize', bmap.children )
  blockMap.blockCount = +textContent( 'BlocksCount', bmap.children )
  blockMap.mappedBlockCount = +textContent( 'MappedBlocksCount', bmap.children )
  blockMap.checksumType = textContent( 'ChecksumType', bmap.children ) || 'sha1'

  var map = firstChild( 'BlockMap', bmap.children )
  if( map && map.children ) {
    blockMap.ranges = getRanges( map )
  }

  return blockMap

}

module.exports = parse
