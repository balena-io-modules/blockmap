var stream = require( 'stream' )
var fs = require( 'fs' )
var inherit = require( 'bloodline' )
var crypto = require( 'crypto' )
var debug = require( 'debug' )( 'blockmap:readstream' )
var BlockMap = require( './blockmap' )

/**
 * ReadStream
 * @constructor
 * @memberOf BlockMap
 * @param {String} filename - image path
 * @param {BlockMap} blockMap - image's blockmap
 * @param {Object} [options] - options
 * @param {Number} [options.fd=null] - file descriptor
 * @param {String} [options.flags='r'] - fs.open() flags
 * @param {Boolean} [options.chunkSize=64K] - default chunk buffer size to read/emit
 * @param {Boolean} [options.verify=true] - verify range checksums
 * @param {Boolean} [options.generateChecksums=false] - calculate range checksums and update blockmap
 * @param {Boolean} [options.autoClose=true] - close the fd on end
 * @param {Number} [options.start] - byte offset in file to read from
 * @param {Number} [options.end] - byte offset in file to stop at
 * @param {Number} [options.fs] - fs like object implementing open, close and read, defaults to node's fs
 * @returns {BlockMap.ReadStream}
 */
function ReadStream( filename, blockMap, options ) {

  if( !(this instanceof ReadStream) ) {
    return new ReadStream( filename, blockMap, options )
  }

  if( blockMap == null ) {
    throw new Error( 'Missing block map' )
  }

  options = options || {}
  options.objectMode = true

  if( filename == null && options.fd == null ) {
    throw new Error( 'Missing filename or file descriptor' )
  }

  stream.Readable.call( this, options )

  /** @type {Number} File descriptor */
  this.fd = options.fd || null
  /** @type {String} File path */
  this.path = filename
  /** @type {String} File open flags */
  this.flags = options.flags || 'r'
  /** @type {BlockMap} The block map */
  this.blockMap = blockMap
  /** @type {Number} Size of a mapped block in bytes */
  this.blockSize = this.blockMap.blockSize
  /** @type {Number} ... */
  this.chunkSize = options.chunkSize || ( 64 * 1024 )
  /** @type {Boolean} Whether or not to verify range checksums */
  this.verify = options.verify != null ?
    !!options.verify : true
  /** @type {Boolean} Whether or not to calculate range checksums and update blockmap */
  this.generateChecksums = options.generateChecksums != null ?
    !!options.generateChecksums : false

  if (this.verify && this.generateChecksums) {
    throw new Error( 'verify and generateChecksums options are mutually exclusive' )
  }

  /** @type {BlockMap.Range} Range being currently processed */
  this.currentRange = null
  /** @type {Number} Number of block map ranges read */
  this.rangesRead = 0
  /** @type {Number} Number of block map ranges verified */
  this.rangesVerified = 0
  /** @type {Number} Number of blocks read */
  this.blocksRead = 0
  /** @type {Number} Number of bytes read */
  this.bytesRead = 0
  /** @type {Number} Current offset in bytes */
  this.position = 0
  /** @type {Number} Position start offset in bytes */
  this.start = options.start || 0
  /** @type {Number} End offset in bytes */
  this.end = options.end != null ?
    options.end : Infinity
  /** @type {Object} fs like object implementing open, close and read */
  this.fs = options.fs || fs
  /** @type {Boolean} Whether the stream has been closed */
  this.closed = false
  /** @type {Boolean} Whether the stream has been destroyed */
  this.destroyed = false

  if( this.start < 0 ) {
    throw new Error( 'Start must not be negative' )
  }

  if( this.start > this.end ) {
    throw new Error( 'Start must be less or equal to end' )
  }

  /**
   * Hash stream to calculate range checksums
   * @type {crypto.Hash}
   * @private
   */
  this._hash = ( this.verify || this.generateChecksums ) ?
    crypto.createHash( this.blockMap.checksumType ) : null

  /**
   * Ranges to be read from the image
   * @type {Array<Object>}
   * @private
   */
  this.ranges = this._prepareRanges()

  this.open()

}

/**
 * ReadStream prototype
 * @type {Object}
 * @private
 */
ReadStream.prototype = {

  constructor: ReadStream,

  /**
   * Preprocess the `blockMap`'s ranges into byte-ranges
   * with respect to the `start` offset, and an `offset`
   * for tracking chunked range reading
   * @returns {Array<Object>} byteRanges
   * @private
   */
  _prepareRanges() {
    return this.blockMap.ranges.map(( range ) => {

      var range = new BlockMap.ReadRange( range, this.blockSize )

      // Account for readstream's start offset
      range.start += this.start
      range.end += this.start

      return range

    }).filter(( range ) => {
      return range.end <= (this.end + this.start)
    })
  },

  /**
   * Verify a fully read range's checksum against
   * the range's checksum from the blockmap
   * @private
   */
  _verifyRange() {

    var needsVerify = ( this.verify || this.generateChecksums ) &&
      this.currentRange != null &&
      this.currentRange.offset === this.currentRange.length

    if( !needsVerify ) return

    var range = this.currentRange
    var digest = this._hash.digest( 'hex' )
    var error = null

    debug( 'verify:checksum', range.checksum )
    debug( 'verify:digest  ', digest )

    this._hash = crypto.createHash( this.blockMap.checksumType )

    if( this.verify && ( range.checksum !== digest ) ) {
      error = new Error( `Invalid checksum for range [${range.startLBA},${range.endLBA}], bytes ${range.start}-${range.end}` )
      error.checksum = digest
      error.range = range
      this.emit( 'error', error )
    }

    if( this.generateChecksums ) {
      range.range.checksum = digest
    } else {
      this.rangesVerified++
    }

  },

  /**
   * Read the current range (or a chunk thereof),
   * update state and emit the read block
   * @private
   */
  _readBlock() {

    var range = this.currentRange
    var length = Math.min( range.length - range.offset, this.chunkSize )
    var position = range.start + range.offset
    var chunk = new BlockMap.Chunk( Buffer.allocUnsafe( length ), position )
    var offset = 0

    debug( 'read-block:position', position )
    debug( 'read-block:length', length )

    this.fs.read( this.fd, chunk.buffer, offset, length, position, ( error, bytesRead ) => {

      if( error == null && bytesRead !== length ) {
        error = new Error( 'Bytes read mismatch: ' + bytesRead + ' != ' + length )
      }

      if( error ) {
        if( this.autoClose ) {
          this.destroy()
        }
        this.emit( 'error', error )
        return
      }

      range.offset += bytesRead

      this.blocksRead += bytesRead / this.blockSize
      this.bytesRead += bytesRead
      this.position += bytesRead

      debug( 'read-block:blocksRead', this.blocksRead )

      // Feed the hash if we're verifying
      if( this.verify || this.generateChecksums ) {
        this._hash.update( chunk.buffer )
      }

      this.push( chunk )

    })

  },

  /**
   * Advance to next the Range if there is one then read a block;
   * else end the stream;
   * @see https://nodejs.org/api/stream.html#stream_implementing_a_readable_stream
   * @private
   */
  _advanceRange() {
    if (this.ranges.length > 0) {
      this.currentRange = this.ranges.shift()
      this.rangesRead++
      debug( 'read:range %O', this.currentRange )
      this._readBlock()
    } else {
      this.push(null)
    }
  },

  /**
   * Initiate a new read, advancing the range if necessary,
   * and verifying checksums, if enabled
   * @see https://nodejs.org/api/stream.html#stream_implementing_a_readable_stream
   * @private
   */
  _read() {

    if( this.fd == null ) {
      return void this.once( 'open', () => { this._read() })
    }

    if (this.currentRange == null) {
      this._advanceRange()
    } else if (this.currentRange.offset === this.currentRange.length) {
      this._verifyRange()
      this._advanceRange()
    } else {
      this._readBlock()
    }

  },

  /**
   * Open a handle to the image file in question
   * @private
   */
  open() {

    if( this.fd != null ) {
      return
    }

    this.fs.open( this.path, this.flags, ( error, fd ) => {
      if( error ) {
        if( this.autoClose ) {
          this.destroy()
        }
        this.emit( 'error', error )
      } else {
        this.fd = fd
        this.emit( 'open', this.fd )
      }
    })

  },

  /**
   * Close the stream, and the underlying file handle
   * @param {Function} [callback] - callback(error)
   */
  close( callback ) {

    if( callback ) {
      this.once( 'close', callback )
    }

    if( this.closed || this.fd == null ) {
      if( this.fd == null ) {
        this.once( 'open', () => {
          this.close()
        })
      } else {
        process.nextTick(() => {
          this.emit( 'close' )
        })
      }
      return
    }

    this.closed = true

    this.fs.close( this.fd, ( error ) => {
      if( error != null ) {
        this.emit( 'error', error )
      } else {
        this.emit( 'close' )
      }
    })

    this.fd = null

  },

  /**
   * Destroy the stream, release any internal resources
   */
  destroy() {

    if( this.destroyed ) {
      return
    }

    this.destroyed = true
    this.close()

  },

}

inherit( ReadStream, stream.Readable )

module.exports = ReadStream
