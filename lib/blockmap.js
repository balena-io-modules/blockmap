/**
 * BlockMap
 * @constructor
 * @param {Object} options
 * @returns {BlockMap}
 */
function BlockMap( options ) {

  if( !(this instanceof BlockMap) )
    return new BlockMap( options )

  options = options || {}

  /** @type {String} format version */
  this.version = options.version || '2.0'
  /** @type {Number} size of the image in bytes */
  this.imageSize = options.imageSize || 0
  /** @type {Number} size of a block in bytes */
  this.blockSize = options.blockSize || 4096
  /** @type {Number} total number of blocks in image */
  this.blockCount = options.blockCount || 0
  /** @type {Number} number of mapped blocks */
  this.mappedBlockCount = options.mappedBlockCount || 0
  /** @type {String} bmap file checksum */
  this.checksum = options.checksum || null
  /** @type {Number} checksum algorithm */
  this.checksumType = options.checksumType || 'sha256'
  /** @type {Number} block ranges */
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
 * Parse a .bmap file
 * @ignore - see parse.js
 */
BlockMap.parse = require( './parse' )

/**
 * Stringify a block map into .bmap format
 * @ignore - see stringify.js
 */
BlockMap.stringify = require( './stringify' )

/**
 * Create a new block map
 * @param {Object} options
 * @returns {BlockMap}
 */
BlockMap.create = function( options ) {
  return new BlockMap( options )
}

/**
 * Create a block map from it's JSON representation
 * @param {String|Object} data
 * @returns {BlockMap}
 */
BlockMap.fromJSON = function( data ) {
  var options = typeof data === 'string' ?
    JSON.parse( data ) : data
  return new BlockMap( options )
}

BlockMap.ReadStream = require( './read-stream' )
BlockMap.FilterStream = require( './filter-stream' )

/**
 * Create a ReadStream for an image with a block map
 * @param {String} filename
 * @param {BlockMap} blockMap - image's blockmap
 * @param {Object} [options] - options
 * @param {String} [options.flags='r'] - fs.open() flags
 * @param {Boolean} [options.verify=true] - verify range checksums
 * @returns {BlockMap.ReadStream}
 */
BlockMap.createReadStream = function( filename, blockMap, options ) {
  return new BlockMap.ReadStream( filename, blockMap, options )
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
   * @param {Object} [options] - options
   * @param {Boolean} [options.verify=true] - verify range checksums
   * @returns {BlockMap}
   */
  parse: function( value, options ) {
    BlockMap.parse( value, this, options )
    return this
  },

  /**
   * Stringify the block map into .bmap format
   * @returns {String} xml
   */
  toString: function() {
    return BlockMap.stringify( this )
  },

}
