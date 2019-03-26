[blockmap](../README.md) > [ReadRange](../classes/readrange.md)

# Class: ReadRange

## Hierarchy

**ReadRange**

## Index

### Constructors

* [constructor](readrange.md#constructor)

### Properties

* [checksum](readrange.md#checksum)
* [end](readrange.md#end)
* [endLBA](readrange.md#endlba)
* [length](readrange.md#length)
* [offset](readrange.md#offset)
* [range](readrange.md#range)
* [start](readrange.md#start)
* [startLBA](readrange.md#startlba)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ReadRange**(range: *[Range](range.md)*, blockSize: *`number`*): [ReadRange](readrange.md)

*Defined in [read-range.ts:34](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-range.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| range | [Range](range.md) |
| blockSize | `number` |

**Returns:** [ReadRange](readrange.md)

___

## Properties

<a id="checksum"></a>

### `<Optional>` checksum

**● checksum**: *`undefined` \| `string`*

*Defined in [read-range.ts:22](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-range.ts#L22)*

*__type__*: {String} Range checksum

___
<a id="end"></a>

###  end

**● end**: *`number`*

*Defined in [read-range.ts:26](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-range.ts#L26)*

Range end offset in bytes

___
<a id="endlba"></a>

###  endLBA

**● endLBA**: *`number`*

*Defined in [read-range.ts:32](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-range.ts#L32)*

Range end LBA

___
<a id="length"></a>

###  length

**● length**: *`number`*

*Defined in [read-range.ts:28](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-range.ts#L28)*

Range length in bytes

___
<a id="offset"></a>

###  offset

**● offset**: *`number`* = 0

*Defined in [read-range.ts:34](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-range.ts#L34)*

Byte offset within range

___
<a id="range"></a>

###  range

**● range**: *[Range](range.md)*

*Defined in [read-range.ts:36](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-range.ts#L36)*

___
<a id="start"></a>

###  start

**● start**: *`number`*

*Defined in [read-range.ts:24](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-range.ts#L24)*

Range start offset in bytes

___
<a id="startlba"></a>

###  startLBA

**● startLBA**: *`number`*

*Defined in [read-range.ts:30](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-range.ts#L30)*

Range start LBA

___

