[blockmap](../README.md) > [FilterStream](../classes/filterstream.md)

# Class: FilterStream

## Hierarchy

 `Transform`

**↳ FilterStream**

## Implements

* `ReadableStream`
* `Writable`

## Index

### Constructors

* [constructor](filterstream.md#constructor)

### Properties

* [_bytes](filterstream.md#_bytes)
* [_chunks](filterstream.md#_chunks)
* [_hash](filterstream.md#_hash)
* [blockMap](filterstream.md#blockmap)
* [blocksRead](filterstream.md#blocksread)
* [blocksWritten](filterstream.md#blockswritten)
* [bytesRead](filterstream.md#bytesread)
* [bytesWritten](filterstream.md#byteswritten)
* [chunkSize](filterstream.md#chunksize)
* [currentRange](filterstream.md#currentrange)
* [generateChecksums](filterstream.md#generatechecksums)
* [position](filterstream.md#position)
* [ranges](filterstream.md#ranges)
* [rangesRead](filterstream.md#rangesread)
* [rangesVerified](filterstream.md#rangesverified)
* [readable](filterstream.md#readable)
* [verify](filterstream.md#verify)
* [writable](filterstream.md#writable)
* [defaultMaxListeners](filterstream.md#defaultmaxlisteners)

### Methods

* [_flush](filterstream.md#_flush)
* [_getByteRangesFromBlockMap](filterstream.md#_getbyterangesfromblockmap)
* [_rangeInChunk](filterstream.md#_rangeinchunk)
* [_read](filterstream.md#_read)
* [_transform](filterstream.md#_transform)
* [_transformBlock](filterstream.md#_transformblock)
* [_verifyRange](filterstream.md#_verifyrange)
* [_write](filterstream.md#_write)
* [addListener](filterstream.md#addlistener)
* [emit](filterstream.md#emit)
* [end](filterstream.md#end)
* [eventNames](filterstream.md#eventnames)
* [getMaxListeners](filterstream.md#getmaxlisteners)
* [isPaused](filterstream.md#ispaused)
* [listenerCount](filterstream.md#listenercount)
* [listeners](filterstream.md#listeners)
* [on](filterstream.md#on)
* [once](filterstream.md#once)
* [pause](filterstream.md#pause)
* [pipe](filterstream.md#pipe)
* [prependListener](filterstream.md#prependlistener)
* [prependOnceListener](filterstream.md#prependoncelistener)
* [push](filterstream.md#push)
* [read](filterstream.md#read)
* [removeAllListeners](filterstream.md#removealllisteners)
* [removeListener](filterstream.md#removelistener)
* [resume](filterstream.md#resume)
* [setDefaultEncoding](filterstream.md#setdefaultencoding)
* [setEncoding](filterstream.md#setencoding)
* [setMaxListeners](filterstream.md#setmaxlisteners)
* [unpipe](filterstream.md#unpipe)
* [unshift](filterstream.md#unshift)
* [wrap](filterstream.md#wrap)
* [write](filterstream.md#write)
* [listenerCount](filterstream.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new FilterStream**(blockMap: *[BlockMap](blockmap.md)*, verify?: *`boolean`*, generateChecksums?: *`boolean`*, chunkSize?: *`number`*): [FilterStream](filterstream.md)

*Overrides Transform.__constructor*

*Defined in [filter-stream.ts:50](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L50)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| blockMap | [BlockMap](blockmap.md) | - |
| `Default value` verify | `boolean` | true |
| `Default value` generateChecksums | `boolean` | false |
| `Default value` chunkSize | `number` |  64 * 1024 |

**Returns:** [FilterStream](filterstream.md)

___

## Properties

<a id="_bytes"></a>

### `<Private>` _bytes

**● _bytes**: *`number`* = 0

*Defined in [filter-stream.ts:50](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L50)*

___
<a id="_chunks"></a>

### `<Private>` _chunks

**● _chunks**: *`Buffer`[]* =  []

*Defined in [filter-stream.ts:49](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L49)*

___
<a id="_hash"></a>

### `<Private>``<Optional>` _hash

**● _hash**: *`Hash`*

*Defined in [filter-stream.ts:48](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L48)*

Hash stream to calculate range checksums

___
<a id="blockmap"></a>

###  blockMap

**● blockMap**: *[BlockMap](blockmap.md)*

*Defined in [filter-stream.ts:53](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L53)*

___
<a id="blocksread"></a>

###  blocksRead

**● blocksRead**: *`number`* = 0

*Defined in [filter-stream.ts:34](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L34)*

Number of blocks read

___
<a id="blockswritten"></a>

###  blocksWritten

**● blocksWritten**: *`number`* = 0

*Defined in [filter-stream.ts:38](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L38)*

Number of bytes written

___
<a id="bytesread"></a>

###  bytesRead

**● bytesRead**: *`number`* = 0

*Defined in [filter-stream.ts:36](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L36)*

Number of bytes read

___
<a id="byteswritten"></a>

###  bytesWritten

**● bytesWritten**: *`number`* = 0

*Defined in [filter-stream.ts:40](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L40)*

Number of bytes written

___
<a id="chunksize"></a>

###  chunkSize

**● chunkSize**: *`number`*

*Defined in [filter-stream.ts:56](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L56)*

___
<a id="currentrange"></a>

### `<Optional>` currentRange

**● currentRange**: *[ReadRange](readrange.md)*

*Defined in [filter-stream.ts:46](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L46)*

Range being currently processed

___
<a id="generatechecksums"></a>

###  generateChecksums

**● generateChecksums**: *`boolean`*

*Defined in [filter-stream.ts:55](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L55)*

___
<a id="position"></a>

###  position

**● position**: *`number`* = 0

*Defined in [filter-stream.ts:42](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L42)*

Current offset in bytes

___
<a id="ranges"></a>

###  ranges

**● ranges**: *[ReadRange](readrange.md)[]*

*Defined in [filter-stream.ts:44](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L44)*

*__type__*: {Array} Ranges

___
<a id="rangesread"></a>

###  rangesRead

**● rangesRead**: *`number`* = 0

*Defined in [filter-stream.ts:30](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L30)*

Number of block map ranges read

___
<a id="rangesverified"></a>

###  rangesVerified

**● rangesVerified**: *`number`* = 0

*Defined in [filter-stream.ts:32](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L32)*

Number of block map ranges verified

___
<a id="readable"></a>

###  readable

**● readable**: *`boolean`*

*Inherited from Readable.readable*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3718*

___
<a id="verify"></a>

###  verify

**● verify**: *`boolean`*

*Defined in [filter-stream.ts:54](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L54)*

___
<a id="writable"></a>

###  writable

**● writable**: *`boolean`*

*Inherited from Duplex.writable*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3885*

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:715*

___

## Methods

<a id="_flush"></a>

### `<Protected>` _flush

▸ **_flush**(done: *`function`*): `void`

*Defined in [filter-stream.ts:254](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L254)*

Flush out any unprocessed chunks from the internal buffer once the stream is being ended

**Parameters:**

| Name | Type |
| ------ | ------ |
| done | `function` |

**Returns:** `void`

___
<a id="_getbyterangesfromblockmap"></a>

### `<Private>` _getByteRangesFromBlockMap

▸ **_getByteRangesFromBlockMap**(): [ReadRange](readrange.md)[]

*Defined in [filter-stream.ts:77](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L77)*

Preprocess the `blockMap`'s ranges into byte-ranges with respect to the `start` offset, and an `offset` for tracking chunked range reading

**Returns:** [ReadRange](readrange.md)[]

___
<a id="_rangeinchunk"></a>

### `<Private>` _rangeInChunk

▸ **_rangeInChunk**(chunk: *`Buffer`*): `boolean`

*Defined in [filter-stream.ts:118](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L118)*

Determine whether a chunk is in the current range

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `Buffer` |

**Returns:** `boolean`

___
<a id="_read"></a>

###  _read

▸ **_read**(size: *`number`*): `void`

*Inherited from Readable._read*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3720*

**Parameters:**

| Name | Type |
| ------ | ------ |
| size | `number` |

**Returns:** `void`

___
<a id="_transform"></a>

###  _transform

▸ **_transform**(chunk: *`Buffer`*, _encoding: *`string`*, next: *`function`*): `void`

*Overrides Transform._transform*

*Defined in [filter-stream.ts:206](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L206)*

Transform input into block-sized chunks

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `Buffer` |
| _encoding | `string` |
| next | `function` |

**Returns:** `void`

___
<a id="_transformblock"></a>

### `<Private>` _transformBlock

▸ **_transformBlock**(chunk: *`Buffer`*, next: *`function`*): `void`

*Defined in [filter-stream.ts:137](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L137)*

Chunk a given input buffer into blocks matching the blockSize and advance the current range, if necessary

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `Buffer` |
| next | `function` |

**Returns:** `void`

___
<a id="_verifyrange"></a>

### `<Private>` _verifyRange

▸ **_verifyRange**(): `void`

*Defined in [filter-stream.ts:89](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/filter-stream.ts#L89)*

Verify a fully read range's checksum against the range's checksum from the blockmap or calculate the range's checksum and update the blockmap if options.generateChecksums is true.

**Returns:** `void`

___
<a id="_write"></a>

###  _write

▸ **_write**(chunk: *`any`*, encoding: *`string`*, callback: *`Function`*): `void`

*Inherited from Duplex._write*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3887*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| encoding | `string` |
| callback | `Function` |

**Returns:** `void`

___
<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *`string`*, listener: *`Function`*): `this`

▸ **addListener**(event: *"close"*, listener: *`function`*): `this`

▸ **addListener**(event: *"data"*, listener: *`function`*): `this`

▸ **addListener**(event: *"end"*, listener: *`function`*): `this`

▸ **addListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **addListener**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3741*

Event emitter The defined events on documents including:

1.  close
2.  data
3.  end
4.  readable
5.  error

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3742*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3743*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3744*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3745*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3746*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *`string` \| `symbol`*, ...args: *`any`[]*): `boolean`

▸ **emit**(event: *"close"*): `boolean`

▸ **emit**(event: *"data"*, chunk: *`Buffer` \| `string`*): `boolean`

▸ **emit**(event: *"end"*): `boolean`

▸ **emit**(event: *"readable"*): `boolean`

▸ **emit**(event: *"error"*, err: *`Error`*): `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3748*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| `Rest` args | `any`[] |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3749*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3750*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| chunk | `Buffer` \| `string` |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3751*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3752*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3753*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| err | `Error` |

**Returns:** `boolean`

___
<a id="end"></a>

###  end

▸ **end**(cb?: *`Function`*): `void`

▸ **end**(chunk: *`any`*, cb?: *`Function`*): `void`

▸ **end**(chunk: *`any`*, encoding?: *`undefined` \| `string`*, cb?: *`Function`*): `void`

*Inherited from Duplex.end*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3891*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` cb | `Function` |

**Returns:** `void`

*Inherited from Duplex.end*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3892*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` cb | `Function` |

**Returns:** `void`

*Inherited from Duplex.end*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3893*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` encoding | `undefined` \| `string` |
| `Optional` cb | `Function` |

**Returns:** `void`

___
<a id="eventnames"></a>

###  eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

*Inherited from EventEmitter.eventNames*

*Overrides EventEmitter.eventNames*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:728*

**Returns:** (`string` \| `symbol`)[]

___
<a id="getmaxlisteners"></a>

###  getMaxListeners

▸ **getMaxListeners**(): `number`

*Inherited from EventEmitter.getMaxListeners*

*Overrides EventEmitter.getMaxListeners*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:725*

**Returns:** `number`

___
<a id="ispaused"></a>

###  isPaused

▸ **isPaused**(): `boolean`

*Inherited from Readable.isPaused*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3725*

**Returns:** `boolean`

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(type: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Overrides EventEmitter.listenerCount*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:729*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | `string` \| `symbol` |

**Returns:** `number`

___
<a id="listeners"></a>

###  listeners

▸ **listeners**(event: *`string` \| `symbol`*): `Function`[]

*Inherited from EventEmitter.listeners*

*Overrides EventEmitter.listeners*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:726*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

___
<a id="on"></a>

###  on

▸ **on**(event: *`string`*, listener: *`Function`*): `this`

▸ **on**(event: *"close"*, listener: *`function`*): `this`

▸ **on**(event: *"data"*, listener: *`function`*): `this`

▸ **on**(event: *"end"*, listener: *`function`*): `this`

▸ **on**(event: *"readable"*, listener: *`function`*): `this`

▸ **on**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3755*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3756*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3757*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3758*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3759*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3760*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *`string`*, listener: *`Function`*): `this`

▸ **once**(event: *"close"*, listener: *`function`*): `this`

▸ **once**(event: *"data"*, listener: *`function`*): `this`

▸ **once**(event: *"end"*, listener: *`function`*): `this`

▸ **once**(event: *"readable"*, listener: *`function`*): `this`

▸ **once**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3762*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3763*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3764*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3765*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3766*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3767*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="pause"></a>

###  pause

▸ **pause**(): `this`

*Inherited from Readable.pause*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3723*

**Returns:** `this`

___
<a id="pipe"></a>

###  pipe

▸ **pipe**<`T`>(destination: *`T`*, options?: *`undefined` \| `object`*): `T`

*Inherited from Readable.pipe*

*Overrides internal.pipe*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3726*

**Type parameters:**

#### T :  `WritableStream`
**Parameters:**

| Name | Type |
| ------ | ------ |
| destination | `T` |
| `Optional` options | `undefined` \| `object` |

**Returns:** `T`

___
<a id="prependlistener"></a>

###  prependListener

▸ **prependListener**(event: *`string`*, listener: *`Function`*): `this`

▸ **prependListener**(event: *"close"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"data"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"end"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3769*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3770*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3771*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3772*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3773*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3774*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="prependoncelistener"></a>

###  prependOnceListener

▸ **prependOnceListener**(event: *`string`*, listener: *`Function`*): `this`

▸ **prependOnceListener**(event: *"close"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"data"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"end"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3776*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3777*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3778*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3779*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3780*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3781*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="push"></a>

###  push

▸ **push**(chunk: *`any`*, encoding?: *`undefined` \| `string`*): `boolean`

*Inherited from Readable.push*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3730*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` encoding | `undefined` \| `string` |

**Returns:** `boolean`

___
<a id="read"></a>

###  read

▸ **read**(size?: *`undefined` \| `number`*): `any`

*Inherited from Readable.read*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3721*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` size | `undefined` \| `number` |

**Returns:** `any`

___
<a id="removealllisteners"></a>

###  removeAllListeners

▸ **removeAllListeners**(event?: *`string` \| `symbol`*): `this`

*Inherited from EventEmitter.removeAllListeners*

*Overrides EventEmitter.removeAllListeners*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:723*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | `string` \| `symbol` |

**Returns:** `this`

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(event: *`string`*, listener: *`Function`*): `this`

▸ **removeListener**(event: *"close"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"data"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"end"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3783*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3784*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3785*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3786*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3787*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3788*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="resume"></a>

###  resume

▸ **resume**(): `this`

*Inherited from Readable.resume*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3724*

**Returns:** `this`

___
<a id="setdefaultencoding"></a>

###  setDefaultEncoding

▸ **setDefaultEncoding**(encoding: *`string`*): `this`

*Inherited from Duplex.setDefaultEncoding*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3890*

**Parameters:**

| Name | Type |
| ------ | ------ |
| encoding | `string` |

**Returns:** `this`

___
<a id="setencoding"></a>

###  setEncoding

▸ **setEncoding**(encoding: *`string`*): `void`

*Inherited from Readable.setEncoding*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3722*

**Parameters:**

| Name | Type |
| ------ | ------ |
| encoding | `string` |

**Returns:** `void`

___
<a id="setmaxlisteners"></a>

###  setMaxListeners

▸ **setMaxListeners**(n: *`number`*): `this`

*Inherited from EventEmitter.setMaxListeners*

*Overrides EventEmitter.setMaxListeners*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:724*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `this`

___
<a id="unpipe"></a>

###  unpipe

▸ **unpipe**<`T`>(destination?: *[T]()*): `void`

*Inherited from Readable.unpipe*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3727*

**Type parameters:**

#### T :  `WritableStream`
**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` destination | [T]() |

**Returns:** `void`

___
<a id="unshift"></a>

###  unshift

▸ **unshift**(chunk: *`any`*): `void`

*Inherited from Readable.unshift*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3728*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |

**Returns:** `void`

___
<a id="wrap"></a>

###  wrap

▸ **wrap**(oldStream: *`ReadableStream`*): `Readable`

*Inherited from Readable.wrap*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3729*

**Parameters:**

| Name | Type |
| ------ | ------ |
| oldStream | `ReadableStream` |

**Returns:** `Readable`

___
<a id="write"></a>

###  write

▸ **write**(chunk: *`any`*, cb?: *`Function`*): `boolean`

▸ **write**(chunk: *`any`*, encoding?: *`undefined` \| `string`*, cb?: *`Function`*): `boolean`

*Inherited from Duplex.write*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3888*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` cb | `Function` |

**Returns:** `boolean`

*Inherited from Duplex.write*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3889*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` encoding | `undefined` \| `string` |
| `Optional` cb | `Function` |

**Returns:** `boolean`

___
<a id="listenercount-1"></a>

### `<Static>` listenerCount

▸ **listenerCount**(emitter: *`EventEmitter`*, event: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:714*

**Parameters:**

| Name | Type |
| ------ | ------ |
| emitter | `EventEmitter` |
| event | `string` \| `symbol` |

**Returns:** `number`

___

