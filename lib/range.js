/**
 * Range
 * @constructor
 * @memberOf BlockMap
 * @param {Number} start
 * @param {Number} end
 * @param {String} [checksum]
 * @returns {Range}
 */
function Range( start, end, checksum ) {

  if( !(this instanceof Range) ) {
    return new Range( start, end, checksum )
  }

  /** @type {Number} Range start (LBA) */
  this.start = start || 0
  /** @type {Number} Range end (inclusive, LBA) */
  this.end = end || 0
  /** @type {String} Range checksum */
  this.checksum = checksum || null

}

/**
 * Create a BlockMap.Range from a given value
 * @param {Object} value
 * @returns {Range}
 */
Range.from = (value) => {
  return new Range( value.start, value.end, value.checksum )
}

/**
 * Range prototype
 * @ignore
 */
Range.prototype = {

  constructor: Range,

  get length() {
    // NOTE: Because a blockmap's range ends are inclusive,
    // we need to add a block to the LBAs here
    return (this.end - this.start) + 1
  },

  set length(value) {
    // NOTE: Because a blockmap's range ends are inclusive,
    // we need to remove a block from the end here
    this.end = this.start + (value - 1)
  },

}

// Exports
module.exports = Range
