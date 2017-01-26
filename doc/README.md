<a name="BlockMap"></a>

## BlockMap
**Kind**: global class  

* [BlockMap](#BlockMap)
    * [new BlockMap(options)](#new_BlockMap_new)
    * _instance_
        * [.parse(value)](#BlockMap+parse) ⇒ <code>[BlockMap](#BlockMap)</code>
    * _static_
        * [.parse](#BlockMap.parse) ⇒ <code>[BlockMap](#BlockMap)</code>
        * [.versions](#BlockMap.versions) : <code>Array</code>
        * [.create(options)](#BlockMap.create) ⇒ <code>[BlockMap](#BlockMap)</code>
        * [.fromJSON(data)](#BlockMap.fromJSON) ⇒ <code>[BlockMap](#BlockMap)</code>
        * [.parse(value, blockMap)](#BlockMap.parse) ⇒ <code>[BlockMap](#BlockMap)</code>


-

<a name="new_BlockMap_new"></a>

### new BlockMap(options)
BlockMap

**Params**

- options <code>Object</code>


-

<a name="BlockMap+parse"></a>

### blockMap.parse(value) ⇒ <code>[BlockMap](#BlockMap)</code>
Parse a .bmap formatted input

**Kind**: instance method of <code>[BlockMap](#BlockMap)</code>  
**Params**

- value <code>String</code> | <code>Buffer</code>


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

<a name="BlockMap.parse"></a>

### BlockMap.parse(value, blockMap) ⇒ <code>[BlockMap](#BlockMap)</code>
Parse a .bmap file

**Kind**: static method of <code>[BlockMap](#BlockMap)</code>  
**Params**

- value <code>String</code> | <code>Buffer</code>
- blockMap <code>[BlockMap](#BlockMap)</code>


-

