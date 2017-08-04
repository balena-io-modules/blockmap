<a name="BlockMap"></a>

## BlockMap
**Kind**: global class  

* [BlockMap](#BlockMap)
    * [new BlockMap([options])](#new_BlockMap_new)
    * _instance_
        * [.version](#BlockMap+version) : <code>String</code>
        * [.imageSize](#BlockMap+imageSize) : <code>Number</code>
        * [.blockSize](#BlockMap+blockSize) : <code>Number</code>
        * [.blockCount](#BlockMap+blockCount) : <code>Number</code>
        * [.mappedBlockCount](#BlockMap+mappedBlockCount) : <code>Number</code>
        * [.checksum](#BlockMap+checksum) : <code>String</code>
        * [.checksumType](#BlockMap+checksumType) : <code>Number</code>
        * [.ranges](#BlockMap+ranges) : <code>Number</code>
        * [.parse(value, [options])](#BlockMap+parse) ⇒ [<code>BlockMap</code>](#BlockMap)
        * [.toString()](#BlockMap+toString) ⇒ <code>String</code>
    * _static_
        * [.FilterStream](#BlockMap.FilterStream)
            * [new FilterStream(blockMap, [options])](#new_BlockMap.FilterStream_new)
            * [.options](#BlockMap.FilterStream+options) : <code>Object</code>
            * [.blockMap](#BlockMap.FilterStream+blockMap) : [<code>BlockMap</code>](#BlockMap)
            * [.blockSize](#BlockMap.FilterStream+blockSize) : <code>Number</code>
            * [.rangesRead](#BlockMap.FilterStream+rangesRead) : <code>Number</code>
            * [.blocksRead](#BlockMap.FilterStream+blocksRead) : <code>Number</code>
            * [.bytesRead](#BlockMap.FilterStream+bytesRead) : <code>Number</code>
            * [.blocksWritten](#BlockMap.FilterStream+blocksWritten) : <code>Number</code>
            * [.bytesWritten](#BlockMap.FilterStream+bytesWritten) : <code>Number</code>
            * [.position](#BlockMap.FilterStream+position) : <code>Number</code>
            * [.ranges](#BlockMap.FilterStream+ranges) : <code>Array.&lt;Object&gt;</code>
            * [.currentRange](#BlockMap.FilterStream+currentRange) : <code>Object</code>
            * [._transformBlock(chunk, next)](#BlockMap.FilterStream+_transformBlock)
        * [.ReadStream](#BlockMap.ReadStream)
            * [new ReadStream(filename, blockMap, [options])](#new_BlockMap.ReadStream_new)
            * [.fd](#BlockMap.ReadStream+fd) : <code>Number</code>
            * [.path](#BlockMap.ReadStream+path) : <code>String</code>
            * [.flags](#BlockMap.ReadStream+flags) : <code>String</code>
            * [.blockMap](#BlockMap.ReadStream+blockMap) : [<code>BlockMap</code>](#BlockMap)
            * [.blockSize](#BlockMap.ReadStream+blockSize) : <code>Number</code>
            * [.verify](#BlockMap.ReadStream+verify) : <code>Boolean</code>
            * [.currentRange](#BlockMap.ReadStream+currentRange) : <code>BlockMap.Range</code>
            * [.rangesRead](#BlockMap.ReadStream+rangesRead) : <code>Number</code>
            * [.blocksRead](#BlockMap.ReadStream+blocksRead) : <code>Number</code>
            * [.bytesRead](#BlockMap.ReadStream+bytesRead) : <code>Number</code>
            * [.position](#BlockMap.ReadStream+position) : <code>Number</code>
            * [.start](#BlockMap.ReadStream+start) : <code>Number</code>
            * [.end](#BlockMap.ReadStream+end) : <code>Number</code>
            * [.closed](#BlockMap.ReadStream+closed) : <code>Boolean</code>
            * [.destroyed](#BlockMap.ReadStream+destroyed) : <code>Boolean</code>
            * [.close([callback])](#BlockMap.ReadStream+close)
            * [.destroy()](#BlockMap.ReadStream+destroy)
        * [.versions](#BlockMap.versions) : <code>Array</code>
        * [.create([options])](#BlockMap.create) ⇒ [<code>BlockMap</code>](#BlockMap)
        * [.fromJSON(data)](#BlockMap.fromJSON) ⇒ [<code>BlockMap</code>](#BlockMap)
        * [.createReadStream(filename, blockMap, [options])](#BlockMap.createReadStream) ⇒ [<code>ReadStream</code>](#BlockMap.ReadStream)
        * [.createFilterStream(blockMap, [options])](#BlockMap.createFilterStream) ⇒ [<code>FilterStream</code>](#BlockMap.FilterStream)
        * [.parse(value, [blockMap], [options])](#BlockMap.parse) ⇒ [<code>BlockMap</code>](#BlockMap)
        * [.stringify(blockMap)](#BlockMap.stringify) ⇒ <code>String</code>


* * *

<a name="new_BlockMap_new"></a>

### new BlockMap([options])
BlockMap

**Params**

- [options] <code>Object</code>
    - [.version] <code>String</code> <code> = &#x27;2.0&#x27;</code>
    - [.imageSize] <code>Number</code> <code> = 0</code>
    - [.blockSize] <code>Number</code> <code> = 4096</code>
    - [.blockCount] <code>Number</code> <code> = 0</code>
    - [.mappedBlockCount] <code>Number</code> <code> = 0</code>
    - [.checksum] <code>String</code>
    - [.checksumType] <code>String</code> <code> = &#x27;sha256&#x27;</code>
    - [.ranges] <code>Array</code> <code> = []</code>


* * *

<a name="BlockMap+version"></a>

### blockMap.version : <code>String</code>
format version

**Kind**: instance property of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap+imageSize"></a>

### blockMap.imageSize : <code>Number</code>
size of the image in bytes

**Kind**: instance property of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap+blockSize"></a>

### blockMap.blockSize : <code>Number</code>
size of a block in bytes

**Kind**: instance property of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap+blockCount"></a>

### blockMap.blockCount : <code>Number</code>
total number of blocks in image

**Kind**: instance property of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap+mappedBlockCount"></a>

### blockMap.mappedBlockCount : <code>Number</code>
number of mapped blocks

**Kind**: instance property of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap+checksum"></a>

### blockMap.checksum : <code>String</code>
bmap file checksum

**Kind**: instance property of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap+checksumType"></a>

### blockMap.checksumType : <code>Number</code>
checksum algorithm

**Kind**: instance property of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap+ranges"></a>

### blockMap.ranges : <code>Number</code>
block ranges

**Kind**: instance property of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap+parse"></a>

### blockMap.parse(value, [options]) ⇒ [<code>BlockMap</code>](#BlockMap)
Parse a .bmap formatted input

**Kind**: instance method of [<code>BlockMap</code>](#BlockMap)  
**Params**

- value <code>String</code> | <code>Buffer</code>
- [options] <code>Object</code> - options
    - [.verify] <code>Boolean</code> <code> = true</code> - verify range checksums


* * *

<a name="BlockMap+toString"></a>

### blockMap.toString() ⇒ <code>String</code>
Stringify the block map into .bmap format

**Kind**: instance method of [<code>BlockMap</code>](#BlockMap)  
**Returns**: <code>String</code> - xml  

* * *

<a name="BlockMap.FilterStream"></a>

### BlockMap.FilterStream
**Kind**: static class of [<code>BlockMap</code>](#BlockMap)  

* [.FilterStream](#BlockMap.FilterStream)
    * [new FilterStream(blockMap, [options])](#new_BlockMap.FilterStream_new)
    * [.options](#BlockMap.FilterStream+options) : <code>Object</code>
    * [.blockMap](#BlockMap.FilterStream+blockMap) : [<code>BlockMap</code>](#BlockMap)
    * [.blockSize](#BlockMap.FilterStream+blockSize) : <code>Number</code>
    * [.rangesRead](#BlockMap.FilterStream+rangesRead) : <code>Number</code>
    * [.blocksRead](#BlockMap.FilterStream+blocksRead) : <code>Number</code>
    * [.bytesRead](#BlockMap.FilterStream+bytesRead) : <code>Number</code>
    * [.blocksWritten](#BlockMap.FilterStream+blocksWritten) : <code>Number</code>
    * [.bytesWritten](#BlockMap.FilterStream+bytesWritten) : <code>Number</code>
    * [.position](#BlockMap.FilterStream+position) : <code>Number</code>
    * [.ranges](#BlockMap.FilterStream+ranges) : <code>Array.&lt;Object&gt;</code>
    * [.currentRange](#BlockMap.FilterStream+currentRange) : <code>Object</code>
    * [._transformBlock(chunk, next)](#BlockMap.FilterStream+_transformBlock)


* * *

<a name="new_BlockMap.FilterStream_new"></a>

#### new FilterStream(blockMap, [options])
FilterStream

**Params**

- blockMap [<code>BlockMap</code>](#BlockMap) - the block map
- [options] <code>Object</code> - options
    - [.verify] <code>Boolean</code> <code> = true</code> - verify range checksums


* * *

<a name="BlockMap.FilterStream+options"></a>

#### filterStream.options : <code>Object</code>
options

**Kind**: instance property of [<code>FilterStream</code>](#BlockMap.FilterStream)  

* * *

<a name="BlockMap.FilterStream+blockMap"></a>

#### filterStream.blockMap : [<code>BlockMap</code>](#BlockMap)
The block map

**Kind**: instance property of [<code>FilterStream</code>](#BlockMap.FilterStream)  

* * *

<a name="BlockMap.FilterStream+blockSize"></a>

#### filterStream.blockSize : <code>Number</code>
Size of a mapped block in bytes

**Kind**: instance property of [<code>FilterStream</code>](#BlockMap.FilterStream)  

* * *

<a name="BlockMap.FilterStream+rangesRead"></a>

#### filterStream.rangesRead : <code>Number</code>
Number of block map ranges read

**Kind**: instance property of [<code>FilterStream</code>](#BlockMap.FilterStream)  

* * *

<a name="BlockMap.FilterStream+blocksRead"></a>

#### filterStream.blocksRead : <code>Number</code>
Number of blocks read

**Kind**: instance property of [<code>FilterStream</code>](#BlockMap.FilterStream)  

* * *

<a name="BlockMap.FilterStream+bytesRead"></a>

#### filterStream.bytesRead : <code>Number</code>
Number of bytes read

**Kind**: instance property of [<code>FilterStream</code>](#BlockMap.FilterStream)  

* * *

<a name="BlockMap.FilterStream+blocksWritten"></a>

#### filterStream.blocksWritten : <code>Number</code>
Number of bytes written

**Kind**: instance property of [<code>FilterStream</code>](#BlockMap.FilterStream)  

* * *

<a name="BlockMap.FilterStream+bytesWritten"></a>

#### filterStream.bytesWritten : <code>Number</code>
Number of bytes written

**Kind**: instance property of [<code>FilterStream</code>](#BlockMap.FilterStream)  

* * *

<a name="BlockMap.FilterStream+position"></a>

#### filterStream.position : <code>Number</code>
Current offset in bytes

**Kind**: instance property of [<code>FilterStream</code>](#BlockMap.FilterStream)  

* * *

<a name="BlockMap.FilterStream+ranges"></a>

#### filterStream.ranges : <code>Array.&lt;Object&gt;</code>
Ranges

**Kind**: instance property of [<code>FilterStream</code>](#BlockMap.FilterStream)  

* * *

<a name="BlockMap.FilterStream+currentRange"></a>

#### filterStream.currentRange : <code>Object</code>
Range being currently processed

**Kind**: instance property of [<code>FilterStream</code>](#BlockMap.FilterStream)  

* * *

<a name="BlockMap.FilterStream+_transformBlock"></a>

#### filterStream._transformBlock(chunk, next)
Chunk a given input buffer into blocks
matching the blockSize and advance the
current range, if necessary

**Kind**: instance method of [<code>FilterStream</code>](#BlockMap.FilterStream)  
**Params**

- chunk <code>Buffer</code>
- next <code>function</code>


* * *

<a name="BlockMap.ReadStream"></a>

### BlockMap.ReadStream
**Kind**: static class of [<code>BlockMap</code>](#BlockMap)  

* [.ReadStream](#BlockMap.ReadStream)
    * [new ReadStream(filename, blockMap, [options])](#new_BlockMap.ReadStream_new)
    * [.fd](#BlockMap.ReadStream+fd) : <code>Number</code>
    * [.path](#BlockMap.ReadStream+path) : <code>String</code>
    * [.flags](#BlockMap.ReadStream+flags) : <code>String</code>
    * [.blockMap](#BlockMap.ReadStream+blockMap) : [<code>BlockMap</code>](#BlockMap)
    * [.blockSize](#BlockMap.ReadStream+blockSize) : <code>Number</code>
    * [.verify](#BlockMap.ReadStream+verify) : <code>Boolean</code>
    * [.currentRange](#BlockMap.ReadStream+currentRange) : <code>BlockMap.Range</code>
    * [.rangesRead](#BlockMap.ReadStream+rangesRead) : <code>Number</code>
    * [.blocksRead](#BlockMap.ReadStream+blocksRead) : <code>Number</code>
    * [.bytesRead](#BlockMap.ReadStream+bytesRead) : <code>Number</code>
    * [.position](#BlockMap.ReadStream+position) : <code>Number</code>
    * [.start](#BlockMap.ReadStream+start) : <code>Number</code>
    * [.end](#BlockMap.ReadStream+end) : <code>Number</code>
    * [.closed](#BlockMap.ReadStream+closed) : <code>Boolean</code>
    * [.destroyed](#BlockMap.ReadStream+destroyed) : <code>Boolean</code>
    * [.close([callback])](#BlockMap.ReadStream+close)
    * [.destroy()](#BlockMap.ReadStream+destroy)


* * *

<a name="new_BlockMap.ReadStream_new"></a>

#### new ReadStream(filename, blockMap, [options])
ReadStream

**Params**

- filename <code>String</code> - image path
- blockMap [<code>BlockMap</code>](#BlockMap) - image's blockmap
- [options] <code>Object</code> - options
    - [.fd] <code>Number</code> <code> = </code> - file descriptor
    - [.flags] <code>String</code> <code> = &#x27;r&#x27;</code> - fs.open() flags
    - [.verify] <code>Boolean</code> <code> = true</code> - verify range checksums
    - [.autoClose] <code>Boolean</code> <code> = true</code> - close the fd on end
    - [.start] <code>Number</code> - byte offset in file to read from
    - [.end] <code>Number</code> - byte offset in file to stop at


* * *

<a name="BlockMap.ReadStream+fd"></a>

#### readStream.fd : <code>Number</code>
File descriptor

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+path"></a>

#### readStream.path : <code>String</code>
File path

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+flags"></a>

#### readStream.flags : <code>String</code>
File open flags

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+blockMap"></a>

#### readStream.blockMap : [<code>BlockMap</code>](#BlockMap)
The block map

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+blockSize"></a>

#### readStream.blockSize : <code>Number</code>
Size of a mapped block in bytes

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+verify"></a>

#### readStream.verify : <code>Boolean</code>
Whether or not to verify range checksums

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+currentRange"></a>

#### readStream.currentRange : <code>BlockMap.Range</code>
Range being currently processed

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+rangesRead"></a>

#### readStream.rangesRead : <code>Number</code>
Number of block map ranges read

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+blocksRead"></a>

#### readStream.blocksRead : <code>Number</code>
Number of blocks read

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+bytesRead"></a>

#### readStream.bytesRead : <code>Number</code>
Number of bytes read

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+position"></a>

#### readStream.position : <code>Number</code>
Current offset in bytes

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+start"></a>

#### readStream.start : <code>Number</code>
Position start offset in bytes

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+end"></a>

#### readStream.end : <code>Number</code>
End offset in bytes

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+closed"></a>

#### readStream.closed : <code>Boolean</code>
Whether the stream has been closed

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+destroyed"></a>

#### readStream.destroyed : <code>Boolean</code>
Whether the stream has been destroyed

**Kind**: instance property of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.ReadStream+close"></a>

#### readStream.close([callback])
Close the stream, and the underlying file handle

**Kind**: instance method of [<code>ReadStream</code>](#BlockMap.ReadStream)  
**Params**

- [callback] <code>function</code> - callback(error)


* * *

<a name="BlockMap.ReadStream+destroy"></a>

#### readStream.destroy()
Destroy the stream, release any internal resources

**Kind**: instance method of [<code>ReadStream</code>](#BlockMap.ReadStream)  

* * *

<a name="BlockMap.versions"></a>

### BlockMap.versions : <code>Array</code>
Supported .bmap format versions

**Kind**: static constant of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap.create"></a>

### BlockMap.create([options]) ⇒ [<code>BlockMap</code>](#BlockMap)
Create a new block map

**Kind**: static method of [<code>BlockMap</code>](#BlockMap)  
**Params**

- [options] <code>Object</code>
    - [.version] <code>String</code> <code> = &#x27;2.0&#x27;</code>
    - [.imageSize] <code>Number</code> <code> = 0</code>
    - [.blockSize] <code>Number</code> <code> = 4096</code>
    - [.blockCount] <code>Number</code> <code> = 0</code>
    - [.mappedBlockCount] <code>Number</code> <code> = 0</code>
    - [.checksum] <code>String</code>
    - [.checksumType] <code>String</code> <code> = &#x27;sha256&#x27;</code>
    - [.ranges] <code>Array</code> <code> = []</code>


* * *

<a name="BlockMap.fromJSON"></a>

### BlockMap.fromJSON(data) ⇒ [<code>BlockMap</code>](#BlockMap)
Create a block map from it's JSON representation

**Kind**: static method of [<code>BlockMap</code>](#BlockMap)  
**Params**

- data <code>String</code> | <code>Object</code>


* * *

<a name="BlockMap.createReadStream"></a>

### BlockMap.createReadStream(filename, blockMap, [options]) ⇒ [<code>ReadStream</code>](#BlockMap.ReadStream)
Create a ReadStream for an image with a block map

**Kind**: static method of [<code>BlockMap</code>](#BlockMap)  
**Returns**: [<code>ReadStream</code>](#BlockMap.ReadStream) - stream  
**Params**

- filename <code>String</code>
- blockMap [<code>BlockMap</code>](#BlockMap) - image's blockmap
- [options] <code>Object</code> - options
    - [.fd] <code>Number</code> <code> = </code> - file descriptor
    - [.flags] <code>String</code> <code> = &#x27;r&#x27;</code> - fs.open() flags
    - [.verify] <code>Boolean</code> <code> = true</code> - verify range checksums
    - [.autoClose] <code>Boolean</code> <code> = true</code> - close the fd on end
    - [.start] <code>Number</code> - byte offset in file to read from
    - [.end] <code>Number</code> - byte offset in file to stop at


* * *

<a name="BlockMap.createFilterStream"></a>

### BlockMap.createFilterStream(blockMap, [options]) ⇒ [<code>FilterStream</code>](#BlockMap.FilterStream)
Create a FilterStream with a given block map

**Kind**: static method of [<code>BlockMap</code>](#BlockMap)  
**Returns**: [<code>FilterStream</code>](#BlockMap.FilterStream) - stream  
**Params**

- blockMap [<code>BlockMap</code>](#BlockMap)
- [options] <code>Object</code>
    - [.verify] <code>Boolean</code> <code> = true</code> - verify range checksums


* * *

<a name="BlockMap.parse"></a>

### BlockMap.parse(value, [blockMap], [options]) ⇒ [<code>BlockMap</code>](#BlockMap)
Parse a .bmap file

**Kind**: static method of [<code>BlockMap</code>](#BlockMap)  
**Params**

- value <code>String</code> | <code>Buffer</code> - input
- [blockMap] [<code>BlockMap</code>](#BlockMap) - BlockMap instance to populate
- [options] <code>Object</code> - options
    - [.verify] <code>Boolean</code> - verify range checksums


* * *

<a name="BlockMap.stringify"></a>

### BlockMap.stringify(blockMap) ⇒ <code>String</code>
Stringify a block map into .bmap format

**Kind**: static method of [<code>BlockMap</code>](#BlockMap)  
**Returns**: <code>String</code> - xml  
**Params**

- blockMap [<code>BlockMap</code>](#BlockMap) - BlockMap instance


* * *

