/**
 * BlockMap Range
 * @constructor
 * @memberOf BlockMap
 * @param {Number} start
 * @param {Number} end
 * @param {String} checksum
 * @returns {Range}
 */
function Range( start, end, checksum ) {

  if( !(this instanceof Range) ) {
    return new Range( start, end, checksum )
  }

  /** @type {Number} First block of range */
  this.start = start || 0
  /** @type {Number} Last block of range */
  this.end = end || 0
  /** @type {String|null} Range checksum */
  this.checksum = checksum || null

}

/**
 * Create a Range
 * @param {Number} start
 * @param {Number} end
 * @param {String} checksum
 * @returns {Range}
 */
Range.create = function( start, end, checksum ) {
  return new Range( start, end, checksum )
}

/**
 * Range prototype
 * @ignore
 */
Range.prototype = {

  constructor: Range,

}

// Exports
module.exports = Range
