[blockmap](../README.md) › [ReadRange](readrange.md)

# Class: ReadRange

## Hierarchy

* **ReadRange**

## Index

### Constructors

* [constructor](readrange.md#constructor)

### Properties

* [checksum](readrange.md#optional-checksum)
* [end](readrange.md#end)
* [endLBA](readrange.md#endlba)
* [length](readrange.md#length)
* [offset](readrange.md#offset)
* [range](readrange.md#range)
* [start](readrange.md#start)
* [startLBA](readrange.md#startlba)

## Constructors

###  constructor

\+ **new ReadRange**(`range`: [Range](range.md), `blockSize`: number): *[ReadRange](readrange.md)*

*Defined in [lib/read-range.ts:34](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`range` | [Range](range.md) |
`blockSize` | number |

**Returns:** *[ReadRange](readrange.md)*

## Properties

### `Optional` checksum

• **checksum**? : *undefined | string*

*Defined in [lib/read-range.ts:22](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L22)*

___

###  end

• **end**: *number*

*Defined in [lib/read-range.ts:26](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L26)*

Range end offset in bytes

___

###  endLBA

• **endLBA**: *number*

*Defined in [lib/read-range.ts:32](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L32)*

Range end LBA

___

###  length

• **length**: *number*

*Defined in [lib/read-range.ts:28](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L28)*

Range length in bytes

___

###  offset

• **offset**: *number* = 0

*Defined in [lib/read-range.ts:34](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L34)*

Byte offset within range

___

###  range

• **range**: *[Range](range.md)*

*Defined in [lib/read-range.ts:36](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L36)*

___

###  start

• **start**: *number*

*Defined in [lib/read-range.ts:24](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L24)*

Range start offset in bytes

___

###  startLBA

• **startLBA**: *number*

*Defined in [lib/read-range.ts:30](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L30)*

Range start LBA
