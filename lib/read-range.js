/**
 * ReadRange
 * @constructor
 * @memberOf BlockMap.ReadStream
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

  this.checksum = range.checksum
  this.start = (range.start * blockSize)
  this.end = ((range.end + 1) * blockSize)
  this.length = range.length * blockSize
  this.startLBA = range.start
  this.endLBA = range.end
  this.offset = 0

}

/**
 * ReadRange prototype
 * @ignore
 */
ReadRange.prototype = {

  constructor: ReadRange,

}

// Exports
module.exports = ReadRange
