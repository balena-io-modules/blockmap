[blockmap](../README.md) › [Range](range.md)

# Class: Range

## Hierarchy

* **Range**

## Index

### Constructors

* [constructor](range.md#constructor)

### Properties

* [checksum](range.md#optional-checksum)
* [end](range.md#end)
* [start](range.md#start)

### Accessors

* [length](range.md#length)

### Methods

* [from](range.md#static-from)

## Constructors

###  constructor

\+ **new Range**(`start`: number, `end`: number, `checksum?`: undefined | string): *[Range](range.md)*

*Defined in [lib/range.ts:20](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/range.ts#L20)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`start` | number | 0 |
`end` | number | 0 |
`checksum?` | undefined &#124; string | - |

**Returns:** *[Range](range.md)*

## Properties

### `Optional` checksum

• **checksum**? : *undefined | string*

*Defined in [lib/range.ts:21](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/range.ts#L21)*

___

###  end

• **end**: *number*

*Defined in [lib/range.ts:21](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/range.ts#L21)*

___

###  start

• **start**: *number*

*Defined in [lib/range.ts:21](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/range.ts#L21)*

## Accessors

###  length

• **get length**(): *number*

*Defined in [lib/range.ts:32](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/range.ts#L32)*

**Returns:** *number*

• **set length**(`value`: number): *void*

*Defined in [lib/range.ts:38](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/range.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *void*

## Methods

### `Static` from

▸ **from**(`value`: [BlockMapOptionsRange](../interfaces/blockmapoptionsrange.md)): *[Range](range.md)*

*Defined in [lib/range.ts:28](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/range.ts#L28)*

Create a BlockMap.Range from a given value

**Parameters:**

Name | Type |
------ | ------ |
`value` | [BlockMapOptionsRange](../interfaces/blockmapoptionsrange.md) |

**Returns:** *[Range](range.md)*
