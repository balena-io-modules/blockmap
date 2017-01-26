var stream = require( 'stream' )
var fs = require( 'fs' )

class ReadStream extends stream.Readable {

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
  constructor( filename, blockMap, options = {} ) {

    super( options )

    this.path = filename
    this.flags = options.flags || 'r'
    this.blockMap = blockMap
    this.blockSize = this.blockMap.blockSize
    this.rangesRead = 0
    this.blocksRead = 0
    this.bytesRead = 0
    this.position = 0

    if( this.path == null ) {
      throw new Error( 'Missing filename' )
    }

    if( this.blockMap == null ) {
      throw new Error( 'Missing block map' )
    }

  }

  _onError( error ) {
    this.destroy()
    this.emit( 'error', error )
  }

  _close() {
    fs.close( this.fd, ( error ) => {
      this.fd = null
      this.push( null )
    })
  }

  _open( callback ) {
    fs.open( this.path, this.flags, ( error, fd ) => {
      if( error ) return this._onError( error )
      this.fd = fd
      callback.call( this )
    })
  }

  _read() {

    if( this.fd == null ) {
      return this._open( this._read )
    }

    if( this.rangesRead === this.blockMap.ranges.length ) {
      return this._close()
    }

    var range = this.blockMap.ranges[ this.rangesRead++ ]
    var blockCount = range.end - range.start + 1
    var position = range.start * this.blockSize
    var length = blockCount * this.blockSize
    var buffer = Buffer.allocUnsafe( length )

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

      this.blocksRead += blockCount
      this.bytesRead += bytesRead
      this.position += bytesRead

      if( this.push( buffer ) ) {
        this._read()
      }

    })

  }

  destroy() {
    fs.close( this.fd, ( error ) => {
      this.fd = null
      stream.Readable.prototype.destroy.call( this )
    })
  }

}

module.exports = ReadStream
