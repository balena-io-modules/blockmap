/**
 * Chunk
 * @constructor
 * @returns {Chunk}
 */
function Chunk( buffer, position ) {

  if( !(this instanceof Chunk) ) {
    return new Chunk( buffer, position )
  }

  this.buffer = buffer
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
