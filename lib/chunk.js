/**
 * Chunk
 * @constructor
 * @memberOf BlockMap
 * @param {Buffer} buffer
 * @param {Number} position
 * @returns {Chunk}
 */
function Chunk( buffer, position ) {

  if( !(this instanceof Chunk) ) {
    return new Chunk( buffer, position )
  }

  /** @type {Buffer} Chunk data buffer */
  this.buffer = buffer
  /** @type {Number} Chunk position */
  this.position = position

}

/**
 * Chunk prototype
 * @ignore
 */
Chunk.prototype = {

  constructor: Chunk,

  get length() {
    return this.buffer.length
  },

}

// Exports
module.exports = Chunk
