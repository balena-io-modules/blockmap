[blockmap](../README.md) > [ReadStream](../classes/readstream.md)

# Class: ReadStream

## Hierarchy

 `Readable`

**↳ ReadStream**

## Implements

* `ReadableStream`

## Index

### Constructors

* [constructor](readstream.md#constructor)

### Properties

* [_hash](readstream.md#_hash)
* [blockMap](readstream.md#blockmap)
* [blocksRead](readstream.md#blocksread)
* [bytesRead](readstream.md#bytesread)
* [chunkSize](readstream.md#chunksize)
* [currentRange](readstream.md#currentrange)
* [end](readstream.md#end)
* [generateChecksums](readstream.md#generatechecksums)
* [position](readstream.md#position)
* [ranges](readstream.md#ranges)
* [rangesRead](readstream.md#rangesread)
* [rangesVerified](readstream.md#rangesverified)
* [readFn](readstream.md#readfn)
* [readable](readstream.md#readable)
* [start](readstream.md#start)
* [verify](readstream.md#verify)
* [defaultMaxListeners](readstream.md#defaultmaxlisteners)

### Methods

* [_advanceRange](readstream.md#_advancerange)
* [_prepareRanges](readstream.md#_prepareranges)
* [_read](readstream.md#_read)
* [_readBlock](readstream.md#_readblock)
* [_verifyRange](readstream.md#_verifyrange)
* [addListener](readstream.md#addlistener)
* [emit](readstream.md#emit)
* [eventNames](readstream.md#eventnames)
* [getMaxListeners](readstream.md#getmaxlisteners)
* [isPaused](readstream.md#ispaused)
* [listenerCount](readstream.md#listenercount)
* [listeners](readstream.md#listeners)
* [on](readstream.md#on)
* [once](readstream.md#once)
* [pause](readstream.md#pause)
* [pipe](readstream.md#pipe)
* [prependListener](readstream.md#prependlistener)
* [prependOnceListener](readstream.md#prependoncelistener)
* [push](readstream.md#push)
* [read](readstream.md#read)
* [removeAllListeners](readstream.md#removealllisteners)
* [removeListener](readstream.md#removelistener)
* [resume](readstream.md#resume)
* [setEncoding](readstream.md#setencoding)
* [setMaxListeners](readstream.md#setmaxlisteners)
* [unpipe](readstream.md#unpipe)
* [unshift](readstream.md#unshift)
* [wrap](readstream.md#wrap)
* [listenerCount](readstream.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ReadStream**(fdOrReadFn: *`number` \| [ReadFunction](../#readfunction)*, blockMap: *[BlockMap](blockmap.md)*, verify?: *`boolean`*, generateChecksums?: *`boolean`*, start?: *`number`*, end?: *`number`*, chunkSize?: *`number`*): [ReadStream](readstream.md)

*Overrides Readable.__constructor*

*Defined in [read-stream.ts:54](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L54)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| fdOrReadFn | `number` \| [ReadFunction](../#readfunction) | - |
| blockMap | [BlockMap](blockmap.md) | - |
| `Default value` verify | `boolean` | true |
| `Default value` generateChecksums | `boolean` | false |
| `Default value` start | `number` | 0 |
| `Default value` end | `number` |  Infinity |
| `Default value` chunkSize | `number` |  64 * 1024 |

**Returns:** [ReadStream](readstream.md)

___

## Properties

<a id="_hash"></a>

### `<Private>``<Optional>` _hash

**● _hash**: *`Hash`*

*Defined in [read-stream.ts:51](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L51)*

Hash stream to calculate range checksums

___
<a id="blockmap"></a>

###  blockMap

**● blockMap**: *[BlockMap](blockmap.md)*

*Defined in [read-stream.ts:58](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L58)*

___
<a id="blocksread"></a>

###  blocksRead

**● blocksRead**: *`number`* = 0

*Defined in [read-stream.ts:45](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L45)*

Number of blocks read

___
<a id="bytesread"></a>

###  bytesRead

**● bytesRead**: *`number`* = 0

*Defined in [read-stream.ts:47](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L47)*

Number of bytes read

___
<a id="chunksize"></a>

###  chunkSize

**● chunkSize**: *`number`*

*Defined in [read-stream.ts:63](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L63)*

___
<a id="currentrange"></a>

### `<Optional>` currentRange

**● currentRange**: *[ReadRange](readrange.md)*

*Defined in [read-stream.ts:39](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L39)*

Range being currently processed

___
<a id="end"></a>

###  end

**● end**: *`number`*

*Defined in [read-stream.ts:62](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L62)*

___
<a id="generatechecksums"></a>

###  generateChecksums

**● generateChecksums**: *`boolean`*

*Defined in [read-stream.ts:60](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L60)*

___
<a id="position"></a>

###  position

**● position**: *`number`* = 0

*Defined in [read-stream.ts:49](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L49)*

Current offset in bytes

___
<a id="ranges"></a>

###  ranges

**● ranges**: *[ReadRange](readrange.md)[]*

*Defined in [read-stream.ts:53](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L53)*

Ranges to be read from the image

___
<a id="rangesread"></a>

###  rangesRead

**● rangesRead**: *`number`* = 0

*Defined in [read-stream.ts:41](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L41)*

Number of block map ranges read

___
<a id="rangesverified"></a>

###  rangesVerified

**● rangesVerified**: *`number`* = 0

*Defined in [read-stream.ts:43](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L43)*

Number of block map ranges verified

___
<a id="readfn"></a>

### `<Private>` readFn

**● readFn**: *[ReadFunction](../#readfunction)*

*Defined in [read-stream.ts:54](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L54)*

___
<a id="readable"></a>

###  readable

**● readable**: *`boolean`*

*Inherited from Readable.readable*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:3718*

___
<a id="start"></a>

###  start

**● start**: *`number`*

*Defined in [read-stream.ts:61](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L61)*

___
<a id="verify"></a>

###  verify

**● verify**: *`boolean`*

*Defined in [read-stream.ts:59](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L59)*

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in /home/alexis/dev/resin.io/blockmap/node_modules/@types/node/index.d.ts:715*

___

## Methods

<a id="_advancerange"></a>

### `<Private>` _advanceRange

▸ **_advanceRange**(): `Promise`<`void`>

*Defined in [read-stream.ts:217](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L217)*

Advance to next the Range if there is one then read a block; else end the stream;

*__see__*: [https://nodejs.org/api/stream.html#stream\_implementing\_a\_readable\_stream](https://nodejs.org/api/stream.html#stream_implementing_a_readable_stream)

**Returns:** `Promise`<`void`>

___
<a id="_prepareranges"></a>

### `<Private>` _prepareRanges

▸ **_prepareRanges**(): [ReadRange](readrange.md)[]

*Defined in [read-stream.ts:118](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L118)*

Preprocess the `blockMap`'s ranges into byte-ranges with respect to the `start` offset, and an `offset` for tracking chunked range reading

**Returns:** [ReadRange](readrange.md)[]

___
<a id="_read"></a>

###  _read

▸ **_read**(): `Promise`<`void`>

*Overrides Readable._read*

*Defined in [read-stream.ts:233](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L233)*

Initiate a new read, advancing the range if necessary, and verifying checksums, if enabled

*__see__*: [https://nodejs.org/api/stream.html#stream\_implementing\_a\_readable\_stream](https://nodejs.org/api/stream.html#stream_implementing_a_readable_stream)

**Returns:** `Promise`<`void`>

___
<a id="_readblock"></a>

### `<Private>` _readBlock

▸ **_readBlock**(): `Promise`<`void`>

*Defined in [read-stream.ts:169](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L169)*

Read the current range (or a chunk thereof), update state and emit the read block

**Returns:** `Promise`<`void`>

___
<a id="_verifyrange"></a>

### `<Private>` _verifyRange

▸ **_verifyRange**(): `void`

*Defined in [read-stream.ts:140](https://github.com/balena-io-modules/blockmap/blob/cb9fb56/lib/read-stream.ts#L140)*

Verify a fully read range's checksum against the range's checksum from the blockmap

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

