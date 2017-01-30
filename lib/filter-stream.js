var stream = require( 'stream' )
var inherit = require( 'bloodline' )

/**
 * FilterStream
 * @constructor
 * @memberOf BlockMap
 * @param {BlockMap} blockMap - the block map
 * @param {Object} options - options
 * @returns {BlockMap.FilterStream}
 */
function FilterStream( blockMap, options ) {

  if( !(this instanceof FilterStream) ) {
    return new FilterStream( blockMap, options )
  }

  if( blockMap == null ) {
    throw new Error( 'Missing block map' )
  }

  options = options || {}

  stream.Transform.call( this, options )

  /** @type {BlockMap} The block map */
  this.blockMap = blockMap
  /** @type {Number} Size of a mapped block in bytes */
  this.blockSize = this.blockMap.blockSize
  /** @type {BlockMap.Range} Range being currently processed */
  this.currentRange = this.blockMap.ranges[0]
  /** @type {Number} Number of block map ranges read */
  this.rangesRead = 0
  /** @type {Number} Number of blocks read */
  this.blocksRead = 0
  /** @type {Number} Number of bytes read */
  this.bytesRead = 0
  /** @type {Number} Number of bytes written */
  this.blocksWritten = 0
  /** @type {Number} Number of bytes written */
  this.bytesWritten = 0
  /** @type {Number} Current offset in bytes */
  this.position = 0

  this._buffers = []
  this._bytes = 0

}

/**
 * FilterStream prototype
 * @type {Object}
 * @private
 */
 FilterStream.prototype = {

  constructor: FilterStream,

  /**
   * Check whether the current position is in a mapped range
   * @private
   * @param {Number} blockAddress
   * @return {Boolean}
   */
  _inRange( blockAddress ) {
    return this.currentRange &&
      blockAddress >= this.currentRange.start &&
      blockAddress <= this.currentRange.end
  },

  /**
   * Push a block out to the readable side,
   * if it's in a mapped range of the block map
   * @private
   * @param {Buffer} block
   * @return {Boolean}
   */
  _pushBlock( block ) {

    this.blocksRead++
    this.bytesRead += block.length

    if( this.currentRange == null ) return

    if( !this._inRange( this.blocksRead - 1 ) ) {
      if( this.blocksRead > this.currentRange.end )
        this.currentRange = this.blockMap.ranges[ ++this.rangesRead ]
      return
    }

    block.address = this.blocksRead - 1
    block.position = block.address * this.blockSize

    this.blocksWritten++
    this.bytesWritten += block.length
    this.position = block.position + block.length

    return this.push( block )

  },

  /**
   * Transform input into block-sized chunks
   * @private
   * @param {Buffer} chunk
   * @param {String} _
   * @param {Function} next
   */
  _transform( chunk, _, next ) {

    this._buffers.push( chunk )
    this._bytes += chunk.length

    if( this._bytes < this.blockSize )
      return next()

    var buffer = Buffer.concat( this._buffers )
    var offset = 0

    while( offset < buffer.length ) {
      this._pushBlock( buffer.slice( offset, offset + this.blockSize ) )
      offset = offset + this.blockSize
    }

    buffer = buffer.slice( offset )

    this._buffers = [ buffer ]
    this._bytes = buffer.length

    next()

  },

}

inherit( FilterStream, stream.Transform )

module.exports = FilterStream
