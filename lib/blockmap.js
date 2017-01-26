/**
 * BlockMap
 * @constructor
 * @param {Object} options
 * @returns {BlockMap}
 */
function BlockMap( options={} ) {

  if( !(this instanceof BlockMap) )
    return new BlockMap( options )

  this.version = options.version || '2.0'
  this.imageSize = options.imageSize || 0
  this.blockSize = options.blockSize || 4096
  this.blockCount = options.blockCount || 0
  this.mappedBlockCount = options.mappedBlockCount || 0
  this.checksumType = options.checksumType || 'sha256'
  this.ranges = options.ranges || []

}

// Exports
module.exports = BlockMap

/**
 * Supported .bmap format versions
 * @type {Array}
 * @constant
 */
BlockMap.versions = [ '1.2', '1.3', '1.4', '2.0' ]

/**
 * Create a new block map
 * @param {Object} options
 * @returns {BlockMap}
 */
BlockMap.create = function( options ) {
  return new BlockMap( options )
}

/**
 * Parse a .bmap file
 * @param {String|Buffer} value
 * @param {BlockMap} blockMap
 * @return {BlockMap}
 */
BlockMap.parse = require( './parse' )

/**
 * Create a block map from it's JSON representation
 * @param {String|Object} data
 * @return {BlockMap}
 */
BlockMap.fromJSON = function( data ) {
  var options = typeof data === 'string' ?
    JSON.parse( data ) : data
  return new BlockMap( options )
}

/**
 * BlockMap prototype
 * @type {Object}
 * @ignore
 */
BlockMap.prototype = {

  constructor: BlockMap,

  /**
   * Parse a .bmap formatted input
   * @param {String|Buffer} value
   * @returns {BlockMap}
   */
  parse: function( value ) {
    BlockMap.parse( value, this )
    return this
  },

  toString: function() {
    throw new Error( 'Not implemented' )
  },

}
