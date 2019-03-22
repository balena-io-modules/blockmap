## Classes

<dl>
<dt><a href="#BlockMap">BlockMap</a></dt>
<dd><p>BlockMap</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#maskChecksum">maskChecksum()</a></dt>
<dd><p>Zero out the file checksum field for checksum calculation</p>
</dd>
<dt><a href="#parse">parse()</a></dt>
<dd><p>Parse a .bmap file</p>
</dd>
</dl>

<a name="BlockMap"></a>

## BlockMap
BlockMap

**Kind**: global class  

* [BlockMap](#BlockMap)
    * [new BlockMap([options])](#new_BlockMap_new)
    * _instance_
        * [.injectChecksum()](#BlockMap+injectChecksum)
        * [.toString()](#BlockMap+toString)
    * _static_
        * [.versions](#BlockMap.versions)
        * [.fromJSON()](#BlockMap.fromJSON)
        * [.parse()](#BlockMap.parse)


* * *

<a name="new_BlockMap_new"></a>

### new BlockMap([options])
**Params**

- [options] <code>Object</code>
    - [.version] <code>String</code> <code> = &#x27;2.0&#x27;</code>
    - [.imageSize] <code>Number</code> <code> = 0</code>
    - [.blockSize] <code>Number</code> <code> = 4096</code>
    - [.blocksCount] <code>Number</code> <code> = 0</code>
    - [.mappedBlocksCount] <code>Number</code> <code> = 0</code>
    - [.checksum] <code>String</code>
    - [.checksumType] <code>String</code> <code> = &#x27;sha256&#x27;</code>
    - [.ranges] <code>Array</code> <code> = []</code>


* * *

<a name="BlockMap+injectChecksum"></a>

### blockMap.injectChecksum()
Calculate the bmap file's checksum and inject it

**Kind**: instance method of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap+toString"></a>

### blockMap.toString()
Stringify a block map into .bmap format

**Kind**: instance method of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap.versions"></a>

### BlockMap.versions
Supported .bmap format versions

**Kind**: static property of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap.fromJSON"></a>

### BlockMap.fromJSON()
Create a block map from its JSON representation

**Kind**: static method of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="BlockMap.parse"></a>

### BlockMap.parse()
Parse a .bmap file

**Kind**: static method of [<code>BlockMap</code>](#BlockMap)  

* * *

<a name="maskChecksum"></a>

## maskChecksum()
Zero out the file checksum field for checksum calculation

**Kind**: global function  

* * *

<a name="parse"></a>

## parse()
Parse a .bmap file

**Kind**: global function  

* * *

