/**
 * ReadRange
 * @constructor
 * @memberOf BlockMap
 * @param {BlockMap.Range} range
 * @param {Number} blockSize
 * @returns {ReadRange}
 */
function ReadRange( range, blockSize ) {

  if( !(this instanceof ReadRange) ) {
    return new ReadRange( range, blockSize )
  }

  if( !blockSize ) {
    throw new Error( 'Missing block size' )
  }

  /** @type {Range} Original Range object */
  this.range = range
  /** @type {String} Range checksum */
  this.checksum = range.checksum
  /** @type {Number} Range start offset in bytes */
  this.start = (range.start * blockSize)
  /** @type {Number} Range end offset in bytes */
  this.end = ((range.end + 1) * blockSize)
  /** @type {Number} Range length in bytes */
  this.length = range.length * blockSize
  /** @type {Number} Range start LBA */
  this.startLBA = range.start
  /** @type {Number} Range end LBA */
  this.endLBA = range.end
  /** @type {Number} Byte offset within range */
  this.offset = 0

}

// Exports
module.exports = ReadRange
