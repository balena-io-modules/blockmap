[blockmap](../README.md) > [BlockMap](../classes/blockmap.md)

# Class: BlockMap

## Hierarchy

**BlockMap**

## Index

### Constructors

* [constructor](blockmap.md#constructor)

### Properties

* [blockSize](blockmap.md#blocksize)
* [blocksCount](blockmap.md#blockscount)
* [checksum](blockmap.md#checksum)
* [checksumType](blockmap.md#checksumtype)
* [imageSize](blockmap.md#imagesize)
* [mappedBlocksCount](blockmap.md#mappedblockscount)
* [ranges](blockmap.md#ranges)
* [version](blockmap.md#version)
* [versions](blockmap.md#versions)

### Methods

* [injectChecksum](blockmap.md#injectchecksum)
* [toString](blockmap.md#tostring)
* [fromJSON](blockmap.md#fromjson)
* [parse](blockmap.md#parse)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new BlockMap**(options?: *[BlockMapOptions](../interfaces/blockmapoptions.md)*): [BlockMap](blockmap.md)

*Defined in [blockmap.ts:63](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L63)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` options | [BlockMapOptions](../interfaces/blockmapoptions.md) |  {} |

**Returns:** [BlockMap](blockmap.md)

___

## Properties

<a id="blocksize"></a>

###  blockSize

**● blockSize**: *`number`*

*Defined in [blockmap.ts:58](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L58)*

___
<a id="blockscount"></a>

###  blocksCount

**● blocksCount**: *`number`*

*Defined in [blockmap.ts:59](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L59)*

___
<a id="checksum"></a>

### `<Optional>` checksum

**● checksum**: *`undefined` \| `string`*

*Defined in [blockmap.ts:61](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L61)*

___
<a id="checksumtype"></a>

###  checksumType

**● checksumType**: *`string`*

*Defined in [blockmap.ts:62](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L62)*

___
<a id="imagesize"></a>

###  imageSize

**● imageSize**: *`number`*

*Defined in [blockmap.ts:57](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L57)*

___
<a id="mappedblockscount"></a>

###  mappedBlocksCount

**● mappedBlocksCount**: *`number`*

*Defined in [blockmap.ts:60](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L60)*

___
<a id="ranges"></a>

###  ranges

**● ranges**: *[Range](range.md)[]*

*Defined in [blockmap.ts:63](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L63)*

___
<a id="version"></a>

### `<Optional>` version

**● version**: *`undefined` \| `string`*

*Defined in [blockmap.ts:56](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L56)*

___
<a id="versions"></a>

### `<Static>` versions

**● versions**: *`string`[]* =  ['1.2', '1.3', '1.4', '2.0']

*Defined in [blockmap.ts:55](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L55)*

Supported .bmap format versions

___

## Methods

<a id="injectchecksum"></a>

### `<Private>` injectChecksum

▸ **injectChecksum**(bmap: *`string`*): `string`

*Defined in [blockmap.ts:79](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L79)*

Calculate the bmap file's checksum and inject it

**Parameters:**

| Name | Type |
| ------ | ------ |
| bmap | `string` |

**Returns:** `string`

___
<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Defined in [blockmap.ts:96](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L96)*

Stringify a block map into .bmap format

**Returns:** `string`

___
<a id="fromjson"></a>

### `<Static>` fromJSON

▸ **fromJSON**(data: *`string` \| `unknown`*): [BlockMap](blockmap.md)

*Defined in [blockmap.ts:90](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L90)*

Create a block map from its JSON representation

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `string` \| `unknown` |

**Returns:** [BlockMap](blockmap.md)

___
<a id="parse"></a>

### `<Static>` parse

▸ **parse**(value: *`string` \| `Buffer`*, verify?: *`boolean`*): [BlockMap](blockmap.md)

*Defined in [blockmap.ts:128](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/blockmap.ts#L128)*

Parse a .bmap file

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| value | `string` \| `Buffer` | - |
| `Default value` verify | `boolean` | true |

**Returns:** [BlockMap](blockmap.md)

___

