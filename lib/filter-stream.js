var stream = require( 'stream' )
var inherit = require( 'bloodline' )
var crypto = require( 'crypto' )
var debug = require( 'debug' )( 'blockmap:filterstream' )
var BlockMap = require( './blockmap' )

/**
 * FilterStream
 * @constructor
 * @memberOf BlockMap
 * @param {BlockMap} blockMap - the block map
 * @param {Object} [options] - options
 * @param {Boolean} [options.verify=true] - verify range checksums
 * @param {Boolean} [options.generateChecksums=false] - calculate range checksums and update blockmap
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

  this.options.readableObjectMode = true
  this.options.verify = this.options.verify != null ?
    !!this.options.verify : true
  this.options.generateChecksums = this.options.generateChecksums != null ?
    !!this.options.generateChecksums : false

  if (this.options.verify && this.options.generateChecksums) {
    throw new Error( 'verify and generateChecksums options are mutually exclusive' )
  }

  stream.Transform.call( this, this.options )

  /** @type {BlockMap} The block map */
  this.blockMap = blockMap
  /** @type {Number} Size of a mapped block in bytes */
  this.blockSize = this.blockMap.blockSize
  /** @type {Number} Number of block map ranges read */
  this.rangesRead = 0
  /** @type {Number} Number of block map ranges verified */
  this.rangesVerified = 0
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
  /** @type {Array<Object>} Ranges */
  this.ranges = this._getByteRangesFromBlockMap()
  /** @type {Object} Range being currently processed */
  this.currentRange = this.ranges.shift()

  this._chunks = []
  this._bytes = 0

  debug( 'range:next', this.currentRange )

  /**
   * Hash stream to calculate range checksums
   * @type {crypto.Hash}
   * @private
   */
  this._hash = ( this.options.verify || this.options.generateChecksums ) ?
    crypto.createHash( this.blockMap.checksumType ) : null

}

// Set the highWaterMark to match `fs` stream
// highWaterMarks of 64KB to avoid speed penalties
FilterStream.HIGH_WATER_MARK = 64 * 1024

/**
 * FilterStream prototype
 * @type {Object}
 * @private
 */
 FilterStream.prototype = {

  constructor: FilterStream,

  /**
   * Preprocess the `blockMap`'s ranges into byte-ranges
   * with respect to the `start` offset, and an `offset`
   * for tracking chunked range reading
   * @private
   * @returns {Array<Object>} byteRanges
   */
  _getByteRangesFromBlockMap() {
    return this.blockMap.ranges.map(( range ) => {
      return new BlockMap.ReadRange( range, this.blockSize )
    })
  },

  /**
   * Verify a fully read range's checksum against
   * the range's checksum from the blockmap
   * or calculate the range's checksum and update the blockmap
   * if options.generateChecksums is true.
   * @private
   */
  _verifyRange() {

    if( !this.options.verify && !this.options.generateChecksums ) return

    var error = null
    var needsVerify = this.currentRange != null &&
      this.currentRange.offset === this.currentRange.length

    if( !needsVerify ) {
      error = new Error( `Unexpected verification for range [${range.startLBA},${range.endLBA}], bytes ${range.start}-${range.end}` )
      error.range = range
      this.emit( 'error', error )
      return
    }

    var range = this.currentRange
    var digest = this._hash.digest( 'hex' )

    debug( 'verify:checksum', range.checksum )
    debug( 'verify:digest  ', digest )

    this._hash = crypto.createHash( this.blockMap.checksumType )

    if( this.options.verify && (range.checksum !== digest) ) {
      error = new Error( `Invalid checksum for range [${range.startLBA},${range.endLBA}], bytes ${range.start}-${range.end}` )
      error.checksum = digest
      error.range = range
      this.emit( 'error', error )
    }

    if ( this.options.generateChecksums ) {
      range.range.checksum = digest
    } else {
      this.rangesVerified++
    }

  },

  /**
   * Determine whether a chunk is in the current range
   * @private
   * @param {Buffer} chunk
   * @returns {Boolean}
   */
  _rangeInChunk( chunk ) {

    var rangeStart = this.currentRange.start + this.currentRange.offset

    var isRangeInChunk = (rangeStart >= this.position) &&
      (rangeStart < (this.position + chunk.length))

    debug( 'range-in-chunk', isRangeInChunk )

    return isRangeInChunk

  },

  /**
   * Chunk a given input buffer into blocks
   * matching the blockSize and advance the
   * current range, if necessary
   * @param {Buffer} chunk
   * @param {Function} next
   */
  _transformBlock( chunk, next ) {

    var range = this.currentRange
    var start = 0
    var end = 0
    var length = 0
    var block = null

    while( range && this._rangeInChunk( chunk ) ) {

      start = range.start + range.offset - this.position
      end = start + range.length - range.offset

      debug( 'slice', start, '-', end )

      // Cut the block, and add position & address to it
      block = new BlockMap.Chunk( chunk.slice( start, end ), range.start + range.offset )

      // Make sure we don't emit buffers not matching
      // the blockSize, in case the range's end is not in the current chunk
      if( end > chunk.length ) {
        length = chunk.length - start
        debug( 'chunk:partial', length )
        if( length % this.blockSize !== 0 ) {
          debug( 'chunk:buffer', 'length < block size' )
          this._chunks.push( block.buffer )
          this._bytes += block.length
          this.position += chunk.length - block.length
          return process.nextTick(next)
        }
      }

      // Keep track of where we are within the current range
      range.offset += block.length

      // Advance counters
      this.bytesWritten += block.length
      this.blocksWritten += block.length / this.blockSize

      // Emit the cut block
      debug( 'push', block.position, block.position / this.blockSize, block )
      this.push( block )

      if( this.options.verify || this.options.generateChecksums ) {
        this._hash.update( block.buffer )
      }

      // Once we've read a complete range,
      // verify it and move to the next range
      if( range.length === range.offset ) {
        this._verifyRange()
        this.rangesRead++
        range = this.currentRange = this.ranges.shift()
        debug( 'range:next', range )
      }

    }

    this.position += chunk.length

    process.nextTick(next)

  },

  /**
   * Transform input into block-sized chunks
   * @private
   * @param {Buffer} chunk
   * @param {String} _
   * @param {Function} next
   */
  _transform( chunk, _, next ) {

    debug( 'position', this.position )
    debug( 'chunk', chunk.length, chunk )

    this.bytesRead += chunk.length
    this.blocksRead += chunk.length / this.blockSize

    // We've run out of ranges; ignore everything
    if( this.currentRange == null ) {
      debug( 'no current range' )
      this.position += chunk.length
      return process.nextTick(next)
    }

    // If this chunk is not in our range at all, skip it
    if( !this._rangeInChunk( chunk ) ) {
      debug( 'chunk:ignore' )
      this.position += chunk.length
      return process.nextTick(next)
    }

    // If we have buffered up chunks,
    // and they don't exceed the highWaterMark yet,
    // buffer this chunk as well, and wait for the next chunk
    if( this._bytes && this._bytes < FilterStream.HIGH_WATER_MARK ) {
      debug( 'chunk:buffer', 'not enough bytes' )
      this._chunks.push( chunk )
      this._bytes += chunk.length
      return process.nextTick(next)
    }

    // If we have enough buffered chunks, concat & emit them
    if( this._bytes ) {
      debug( 'chunk:concat', this._bytes + chunk.length )
      this._chunks.push( chunk )
      this._bytes += chunk.length
      chunk = Buffer.concat( this._chunks, this._bytes )
      this._chunks = []
      this._bytes = 0
    }

    this._transformBlock( chunk, next )

  },

  /**
   * Flush out any unprocessed chunks from
   * the internal buffer once the stream is being ended
   * @private
   * @param {Function} done
   */
  _flush( done ) {
    if( this._bytes ) {
      var chunk = Buffer.concat( this._chunks, this._bytes )
      this._chunks = []
      this._bytes = 0
      this._transformBlock( chunk, done )
    } else {
      done()
    }
  },

}

inherit( FilterStream, stream.Transform )

module.exports = FilterStream
