var stream = require( 'stream' )
var inherit = require( 'bloodline' )
var crypto = require( 'crypto' )

/**
 * FilterStream
 * @constructor
 * @memberOf BlockMap
 * @param {BlockMap} blockMap - the block map
 * @param {Object} [options] - options
 * @param {Boolean} [options.verify=true] - verify range checksums
 * @returns {BlockMap.FilterStream}
 */
function FilterStream( blockMap, options ) {

  if( !(this instanceof FilterStream) ) {
    return new FilterStream( blockMap, options )
  }

  if( blockMap == null ) {
    throw new Error( 'Missing block map' )
  }

  /** @type {Object} options */
  this.options = options || {}

  this.options.verify = this.options.verify != null ?
    !!this.options.verify : true

  stream.Transform.call( this, this.options )

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

  /**
   * Internal buffer queue for chunking to block size,
   * if source does not emit appropriately sized chunks
   * @type {Buffer[]}
   * @private
   */
  this._buffers = []

  /**
   * Internal buffer's byte counter
   * @type {Number}
   * @private
   */
  this._bytes = 0

  /**
   * Hash stream to calculate range checksums
   * @type {crypto.Hash}
   * @private
   */
  this._hash = this.options.verify ?
    crypto.createHash( this.blockMap.checksumType ) : null

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
   * @returns {Boolean}
   */
  _inRange( blockAddress ) {
    return this.currentRange &&
      blockAddress >= this.currentRange.start &&
      blockAddress <= this.currentRange.end
  },

  /**
   * Verify the current range, if completed,
   * and emit an error on mismatch
   * @private
   */
  _verifyRange() {

    var needsVerify = this.options.verify &&
      this.currentRange != null

    if( !needsVerify ) return

    var range = this.currentRange
    var digest = this._hash.digest( 'hex' )
    var error = null

    this._hash = crypto.createHash( this.blockMap.checksumType )

    if( range.checksum !== digest ) {
      error = new Error( 'Invalid checksum for range [' + range.start + ',' + range.end + ']' )
      error.checksum = digest
      error.range = range
      this.emit( 'error', error )
    }

  },

  /**
   * Push a block out to the readable side,
   * if it's in a mapped range of the block map
   * @private
   * @param {Buffer} block
   * @returns {Boolean}
   */
  _pushBlock( block ) {

    this.blocksRead++
    this.bytesRead += block.length

    if( this.currentRange == null ) return

    if( !this._inRange( this.blocksRead - 1 ) ) {
      if( this.blocksRead > this.currentRange.end ) {
        this._verifyRange()
        this.currentRange = this.blockMap.ranges[ ++this.rangesRead ]
      }
      return
    }

    block.address = this.blocksRead - 1
    block.position = block.address * this.blockSize

    this.blocksWritten++
    this.bytesWritten += block.length
    this.position = block.position + block.length

    if( this.options.verify ) {
      this._hash.update( block )
    }

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
