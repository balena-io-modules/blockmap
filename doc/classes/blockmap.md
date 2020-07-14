[blockmap](../README.md) › [BlockMap](blockmap.md)

# Class: BlockMap

## Hierarchy

* **BlockMap**

## Index

### Constructors

* [constructor](blockmap.md#constructor)

### Properties

* [blockSize](blockmap.md#blocksize)
* [blocksCount](blockmap.md#blockscount)
* [checksum](blockmap.md#optional-checksum)
* [checksumType](blockmap.md#checksumtype)
* [imageSize](blockmap.md#imagesize)
* [mappedBlocksCount](blockmap.md#mappedblockscount)
* [ranges](blockmap.md#ranges)
* [version](blockmap.md#optional-version)
* [versions](blockmap.md#static-versions)

### Methods

* [injectChecksum](blockmap.md#private-injectchecksum)
* [toString](blockmap.md#tostring)
* [fromJSON](blockmap.md#static-fromjson)
* [parse](blockmap.md#static-parse)

## Constructors

###  constructor

\+ **new BlockMap**(`options`: [BlockMapOptions](../interfaces/blockmapoptions.md)): *[BlockMap](blockmap.md)*

*Defined in [lib/blockmap.ts:63](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L63)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`options` | [BlockMapOptions](../interfaces/blockmapoptions.md) | {} |

**Returns:** *[BlockMap](blockmap.md)*

## Properties

###  blockSize

• **blockSize**: *number*

*Defined in [lib/blockmap.ts:58](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L58)*

___

###  blocksCount

• **blocksCount**: *number*

*Defined in [lib/blockmap.ts:59](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L59)*

___

### `Optional` checksum

• **checksum**? : *undefined | string*

*Defined in [lib/blockmap.ts:61](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L61)*

___

###  checksumType

• **checksumType**: *string*

*Defined in [lib/blockmap.ts:62](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L62)*

___

###  imageSize

• **imageSize**: *number*

*Defined in [lib/blockmap.ts:57](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L57)*

___

###  mappedBlocksCount

• **mappedBlocksCount**: *number*

*Defined in [lib/blockmap.ts:60](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L60)*

___

###  ranges

• **ranges**: *[Range](range.md)[]*

*Defined in [lib/blockmap.ts:63](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L63)*

___

### `Optional` version

• **version**? : *undefined | string*

*Defined in [lib/blockmap.ts:56](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L56)*

___

### `Static` versions

▪ **versions**: *string[]* = ['1.2', '1.3', '1.4', '2.0']

*Defined in [lib/blockmap.ts:55](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L55)*

Supported .bmap format versions

## Methods

### `Private` injectChecksum

▸ **injectChecksum**(`bmap`: string): *string*

*Defined in [lib/blockmap.ts:79](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L79)*

Calculate the bmap file's checksum and inject it

**Parameters:**

Name | Type |
------ | ------ |
`bmap` | string |

**Returns:** *string*

___

###  toString

▸ **toString**(): *string*

*Defined in [lib/blockmap.ts:94](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L94)*

Stringify a block map into .bmap format

**Returns:** *string*

___

### `Static` fromJSON

▸ **fromJSON**(`data`: string | unknown): *[BlockMap](blockmap.md)‹›*

*Defined in [lib/blockmap.ts:88](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L88)*

Create a block map from its JSON representation

**Parameters:**

Name | Type |
------ | ------ |
`data` | string &#124; unknown |

**Returns:** *[BlockMap](blockmap.md)‹›*

___

### `Static` parse

▸ **parse**(`value`: string | Buffer, `verify`: boolean): *[BlockMap](blockmap.md)*

*Defined in [lib/blockmap.ts:126](https://github.com/balena-io-modules/blockmap/blob/5d53a58/lib/blockmap.ts#L126)*

Parse a .bmap file

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`value` | string &#124; Buffer | - |
`verify` | boolean | true |

**Returns:** *[BlockMap](blockmap.md)*
