<a name="BlockMap"></a>

## BlockMap
**Kind**: global class  

* [BlockMap](#BlockMap)
    * [new BlockMap(options)](#new_BlockMap_new)
    * _instance_
        * [.version](#BlockMap+version) : <code>String</code>
        * [.imageSize](#BlockMap+imageSize) : <code>Number</code>
        * [.blockSize](#BlockMap+blockSize) : <code>Number</code>
        * [.blockCount](#BlockMap+blockCount) : <code>Number</code>
        * [.mappedBlockCount](#BlockMap+mappedBlockCount) : <code>Number</code>
        * [.checksumType](#BlockMap+checksumType) : <code>Number</code>
        * [.ranges](#BlockMap+ranges) : <code>Number</code>
        * [.parse(value)](#BlockMap+parse) ⇒ <code>[BlockMap](#BlockMap)</code>
    * _static_
        * [.ReadStream](#BlockMap.ReadStream)
            * [new ReadStream(filename, blockMap, options)](#new_BlockMap.ReadStream_new)
        * [.parse](#BlockMap.parse) ⇒ <code>[BlockMap](#BlockMap)</code>
        * [.versions](#BlockMap.versions) : <code>Array</code>
        * [.create(options)](#BlockMap.create) ⇒ <code>[BlockMap](#BlockMap)</code>
        * [.fromJSON(data)](#BlockMap.fromJSON) ⇒ <code>[BlockMap](#BlockMap)</code>
        * [.createReadStream(filename, blockMap, options)](#BlockMap.createReadStream) ⇒ <code>[ReadStream](#BlockMap.ReadStream)</code>
        * [.parse(value, blockMap)](#BlockMap.parse) ⇒ <code>[BlockMap](#BlockMap)</code>


-

<a name="new_BlockMap_new"></a>

### new BlockMap(options)
BlockMap

**Params**

- options <code>Object</code>


-

<a name="BlockMap+version"></a>

### blockMap.version : <code>String</code>
format version

**Kind**: instance property of <code>[BlockMap](#BlockMap)</code>  

-

<a name="BlockMap+imageSize"></a>

### blockMap.imageSize : <code>Number</code>
size of the image in bytes

**Kind**: instance property of <code>[BlockMap](#BlockMap)</code>  

-

<a name="BlockMap+blockSize"></a>

### blockMap.blockSize : <code>Number</code>
size of a block in bytes

**Kind**: instance property of <code>[BlockMap](#BlockMap)</code>  

-

<a name="BlockMap+blockCount"></a>

### blockMap.blockCount : <code>Number</code>
total number of blocks in image

**Kind**: instance property of <code>[BlockMap](#BlockMap)</code>  

-

<a name="BlockMap+mappedBlockCount"></a>

### blockMap.mappedBlockCount : <code>Number</code>
number of mapped blocks

**Kind**: instance property of <code>[BlockMap](#BlockMap)</code>  

-

<a name="BlockMap+checksumType"></a>

### blockMap.checksumType : <code>Number</code>
checksum algorithm

**Kind**: instance property of <code>[BlockMap](#BlockMap)</code>  

-

<a name="BlockMap+ranges"></a>

### blockMap.ranges : <code>Number</code>
block ranges

**Kind**: instance property of <code>[BlockMap](#BlockMap)</code>  

-

<a name="BlockMap+parse"></a>

### blockMap.parse(value) ⇒ <code>[BlockMap](#BlockMap)</code>
Parse a .bmap formatted input

**Kind**: instance method of <code>[BlockMap](#BlockMap)</code>  
**Params**

- value <code>String</code> | <code>Buffer</code>


-

<a name="BlockMap.ReadStream"></a>

### BlockMap.ReadStream
**Kind**: static class of <code>[BlockMap](#BlockMap)</code>  

-

<a name="new_BlockMap.ReadStream_new"></a>

#### new ReadStream(filename, blockMap, options)
ReadStream

**Params**

- filename <code>String</code> - image path
- blockMap <code>[BlockMap](#BlockMap)</code> - image's blockmap
- options <code>Object</code>
    - .flags <code>String</code> - fs.open() flags


-

<a name="BlockMap.parse"></a>

### BlockMap.parse ⇒ <code>[BlockMap](#BlockMap)</code>
Parse a .bmap file

**Kind**: static property of <code>[BlockMap](#BlockMap)</code>  
**Params**

- value <code>String</code> | <code>Buffer</code>
- blockMap <code>[BlockMap](#BlockMap)</code>


-

<a name="BlockMap.versions"></a>

### BlockMap.versions : <code>Array</code>
Supported .bmap format versions

**Kind**: static constant of <code>[BlockMap](#BlockMap)</code>  

-

<a name="BlockMap.create"></a>

### BlockMap.create(options) ⇒ <code>[BlockMap](#BlockMap)</code>
Create a new block map

**Kind**: static method of <code>[BlockMap](#BlockMap)</code>  
**Params**

- options <code>Object</code>


-

<a name="BlockMap.fromJSON"></a>

### BlockMap.fromJSON(data) ⇒ <code>[BlockMap](#BlockMap)</code>
Create a block map from it's JSON representation

**Kind**: static method of <code>[BlockMap](#BlockMap)</code>  
**Params**

- data <code>String</code> | <code>Object</code>


-

<a name="BlockMap.createReadStream"></a>

### BlockMap.createReadStream(filename, blockMap, options) ⇒ <code>[ReadStream](#BlockMap.ReadStream)</code>
Create a ReadStream for an image with a block map

**Kind**: static method of <code>[BlockMap](#BlockMap)</code>  
**Params**

- filename <code>String</code>
- blockMap <code>[BlockMap](#BlockMap)</code> - image's blockmap
- options <code>Object</code>
    - .flags <code>String</code> - fs.open() flags


-

<a name="BlockMap.parse"></a>

### BlockMap.parse(value, blockMap) ⇒ <code>[BlockMap](#BlockMap)</code>
Parse a .bmap file

**Kind**: static method of <code>[BlockMap](#BlockMap)</code>  
**Params**

- value <code>String</code> | <code>Buffer</code>
- blockMap <code>[BlockMap](#BlockMap)</code>


-

