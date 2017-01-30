var stream = require( 'stream' )
var fs = require( 'fs' )
var inherit = require( 'bloodline' )

/**
 * ReadStream
 * @constructor
 * @memberOf BlockMap
 * @param {String} filename - image path
 * @param {BlockMap} blockMap - image's blockmap
 * @param {Object} options
 * @param {String} options.flags - fs.open() flags
 * @returns {BlockMap.ReadStream}
 */
function ReadStream( filename, blockMap, options ) {

  if( !(this instanceof ReadStream) )
    return new ReadStream( filename, blockMap, options )

  if( filename == null ) {
    throw new Error( 'Missing filename' )
  }

  if( blockMap == null ) {
    throw new Error( 'Missing block map' )
  }

  options = options || {}

  stream.Readable.call( this, options )

  /** @type {String} File path */
  this.path = filename
  /** @type {String} File open flags */
  this.flags = options.flags || 'r'
  /** @type {BlockMap} The block map */
  this.blockMap = blockMap
  /** @type {Number} Size of a mapped block in bytes */
  this.blockSize = this.blockMap.blockSize
  /** @type {BlockMap.Range} Range being currently processed */
  this.currentRange = null
  /** @type {Number} Current block in range */
  this.blockInRange = 0
  /** @type {Number} Number of block map ranges read */
  this.rangesRead = 0
  /** @type {Number} Number of blocks read */
  this.blocksRead = 0
  /** @type {Number} Number of bytes read */
  this.bytesRead = 0
  /** @type {Number} Current offset in bytes */
  this.position = 0

  /**
   * Whether there's a read in progress
   * @type {Boolean}
   * @private
   */
  this._isReading = false

}

/**
 * ReadStream prototype
 * @type {Object}
 * @private
 */
ReadStream.prototype = {

  constructor: ReadStream,

  get rangeBlockCount() {
    return this.currentRange &&
      this.currentRange.end - this.currentRange.start + 1
  },

  _onError( error ) {
    this.destroy()
    this.emit( 'error', error )
  },

  _close() {
    fs.close( this.fd, ( error ) => {
      this.fd = null
      this.push( null )
    })
  },

  _open( callback ) {
    fs.open( this.path, this.flags, ( error, fd ) => {
      if( error ) return this._onError( error )
      this.fd = fd
      callback.call( this )
    })
  },

  _readBlock() {

    var range = this.currentRange
    var block = this.blockInRange++
    var position = ( range.start + block ) * this.blockSize
    var length = this.blockSize
    var buffer = Buffer.allocUnsafe( this.blockSize )

    this._isReading = true

    // NOTE: Adding properties to core objects
    // is not good practice, but should suffice as a PoC
    buffer.address = range.start
    // NOTE: `buffer.offset` doesn't fly,
    // as it's an undocumented getter on Buffers
    buffer.position = position

    this.position = position

    fs.read( this.fd, buffer, 0, length, position, ( error, bytesRead, buffer ) => {

      if( bytesRead !== length ) {
        return this.emit( 'error', new Error( 'Bytes read mismatch: ' + bytesRead + ' != ' + length ) )
      }

      this.blocksRead++
      this.bytesRead += bytesRead
      this.position += bytesRead

      // Check if we should continue reading
      if( this.push( buffer ) ) {
        this._isReading = false
        // If we've hit the end of the range,
        // proceed to the next range
        if( this.blockInRange >= this.rangeBlockCount ) {
          this._read()
        } else {
          this._readBlock()
        }
      }

    })

  },

  _read() {

    if( this._isReading ) return;

    if( this.fd == null ) {
      return this._open( this._read )
    }

    if( this.rangesRead === this.blockMap.ranges.length ) {
      return this._close()
    }

    if( this.currentRange == null || this.blockInRange >= this.rangeBlockCount ) {
      this.currentRange = this.blockMap.ranges[ this.rangesRead++ ]
      this.blockInRange = 0
      this._readBlock()
    }

  },

  destroy() {
    fs.close( this.fd, ( error ) => {
      this.fd = null
      stream.Readable.prototype.destroy.call( this )
    })
  },

}

inherit( ReadStream, stream.Readable )

module.exports = ReadStream
