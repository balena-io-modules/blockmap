var BlockMap = require( './blockmap' )
var htmlparser = require( 'htmlparser2' )
var crypto = require( 'crypto' )

/**
 * Get the first tag of given name from a collection of nodes
 * @private
 * @param {String} name
 * @param {Array} nodes
 * @returns {Object} node
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
 * @returns {String}
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
 * @returns {String}
 */
function textContent( name, nodes ) {
  var node = firstChild( name, nodes )
  return node ? getText( node ).trim() : null
}

/**
 * Extract the block ranges from the DOM
 * @private
 * @param {Object} map
 * @returns {Array}
 */
function getRanges( map ) {

  var node = null
  var parts = null
  var range = null
  var ranges = []

  for( var i = 0; i < map.children.length; i++ ) {
    node = map.children[i]
    if( node.type === 'tag' && node.name.toLowerCase() === 'range' ) {
      parts = getText( node ).trim().split( '-' )
      range = new BlockMap.Range(
        parseInt( parts[0], 10 ),
        parseInt( parts[1] || parts[0], 10 ),
        node.attribs.sha1 || node.attribs.chksum
      )
      ranges.push( range )
    }
  }

  return ranges

}

/**
 * Zero out the file checksum field for checksum calculation
 * @private
 * @param {String} value - input
 * @returns {String} maskedValue
 */
function maskChecksum( value ) {

  var pattern = /BmapFileChecksum/.test( value ) ?
    /(<BmapFileChecksum>\s*)([a-z0-9]+)(\s*<\/BmapFileChecksum>)/i :
    /(<BmapFileSHA1>\s*)([a-z0-9]+)(\s*<\/BmapFileSHA1>)/i

  return value.replace( pattern, function( match, start, checksum, end ) {
    return start + checksum.replace( /./g, '0' ) + end
  })

}

/**
 * Parse a .bmap file
 * @memberOf BlockMap
 * @param {String|Buffer} value - input
 * @param {BlockMap} [blockMap] - BlockMap instance to populate
 * @param {Object} [options] - options
 * @param {Boolean} [options.verify] - verify range checksums
 * @returns {BlockMap}
 */
function parse( value, blockMap, options ) {

  if( !(blockMap instanceof BlockMap) ) {
    options = blockMap
    blockMap = null
  }

  blockMap = blockMap || new BlockMap()

  options = options || {}
  options.verify = options.verify != null ?
    !!options.verify : true

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

  if( !~BlockMap.versions.indexOf( blockMap.version ) ) {
    throw new Error( 'Unsupported block map version "' + blockMap.version + '"' )
  }

  blockMap.imageSize = +textContent( 'ImageSize', bmap.children )
  blockMap.blockSize = +textContent( 'BlockSize', bmap.children )
  blockMap.blockCount = +textContent( 'BlocksCount', bmap.children )
  blockMap.mappedBlockCount = +textContent( 'MappedBlocksCount', bmap.children )
  blockMap.checksum = textContent( 'BmapFileChecksum', bmap.children ) ||
    textContent( 'BmapFileSHA1', bmap.children ) || null
  blockMap.checksumType = textContent( 'ChecksumType', bmap.children ) || 'sha1'

  var map = firstChild( 'BlockMap', bmap.children )
  if( map && map.children ) {
    blockMap.ranges = getRanges( map )
  }

  if( options.verify && blockMap.checksum != null ) {
    var file = maskChecksum( value.toString() )
    var digest = crypto.createHash( blockMap.checksumType )
      .update( file ).digest( 'hex' )
    if( blockMap.checksum !== digest ) {
      throw new Error( 'File checksum mismatch:\n' + blockMap.checksum + ' != \n' + digest )
    }
  }

  return blockMap

}

module.exports = parse
