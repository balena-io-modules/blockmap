[blockmap](../README.md) › [ReadStream](readstream.md)

# Class: ReadStream

## Hierarchy

* Readable

  ↳ **ReadStream**

## Implements

* ReadableStream

## Index

### Constructors

* [constructor](readstream.md#constructor)

### Properties

* [_hash](readstream.md#private-optional-_hash)
* [blockMap](readstream.md#readonly-blockmap)
* [blocksRead](readstream.md#blocksread)
* [bytesRead](readstream.md#bytesread)
* [chunkSize](readstream.md#readonly-chunksize)
* [currentRange](readstream.md#optional-currentrange)
* [end](readstream.md#readonly-end)
* [generateChecksums](readstream.md#readonly-generatechecksums)
* [position](readstream.md#position)
* [ranges](readstream.md#ranges)
* [rangesRead](readstream.md#rangesread)
* [rangesVerified](readstream.md#rangesverified)
* [readFn](readstream.md#private-readfn)
* [readable](readstream.md#readable)
* [start](readstream.md#readonly-start)
* [verify](readstream.md#readonly-verify)
* [defaultMaxListeners](readstream.md#static-defaultmaxlisteners)

### Methods

* [_advanceRange](readstream.md#private-_advancerange)
* [_prepareRanges](readstream.md#private-_prepareranges)
* [_read](readstream.md#_read)
* [_readBlock](readstream.md#private-_readblock)
* [_verifyRange](readstream.md#private-_verifyrange)
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
* [listenerCount](readstream.md#static-listenercount)

## Constructors

###  constructor

\+ **new ReadStream**(`fdOrReadFn`: number | [ReadFunction](../README.md#readfunction), `blockMap`: [BlockMap](blockmap.md), `verify`: boolean, `generateChecksums`: boolean, `start`: number, `end`: number, `chunkSize`: number): *[ReadStream](readstream.md)*

*Overrides void*

*Defined in [lib/read-stream.ts:54](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L54)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fdOrReadFn` | number &#124; [ReadFunction](../README.md#readfunction) | - |
`blockMap` | [BlockMap](blockmap.md) | - |
`verify` | boolean | true |
`generateChecksums` | boolean | false |
`start` | number | 0 |
`end` | number | Infinity |
`chunkSize` | number | 64 * 1024 |

**Returns:** *[ReadStream](readstream.md)*

## Properties

### `Private` `Optional` _hash

• **_hash**? : *Hash*

*Defined in [lib/read-stream.ts:51](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L51)*

Hash stream to calculate range checksums

___

### `Readonly` blockMap

• **blockMap**: *[BlockMap](blockmap.md)*

*Defined in [lib/read-stream.ts:58](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L58)*

___

###  blocksRead

• **blocksRead**: *number* = 0

*Defined in [lib/read-stream.ts:45](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L45)*

Number of blocks read

___

###  bytesRead

• **bytesRead**: *number* = 0

*Defined in [lib/read-stream.ts:47](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L47)*

Number of bytes read

___

### `Readonly` chunkSize

• **chunkSize**: *number*

*Defined in [lib/read-stream.ts:63](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L63)*

___

### `Optional` currentRange

• **currentRange**? : *[ReadRange](readrange.md)*

*Defined in [lib/read-stream.ts:39](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L39)*

Range being currently processed

___

### `Readonly` end

• **end**: *number*

*Defined in [lib/read-stream.ts:62](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L62)*

___

### `Readonly` generateChecksums

• **generateChecksums**: *boolean*

*Defined in [lib/read-stream.ts:60](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L60)*

___

###  position

• **position**: *number* = 0

*Defined in [lib/read-stream.ts:49](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L49)*

Current offset in bytes

___

###  ranges

• **ranges**: *[ReadRange](readrange.md)[]*

*Defined in [lib/read-stream.ts:53](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L53)*

Ranges to be read from the image

___

###  rangesRead

• **rangesRead**: *number* = 0

*Defined in [lib/read-stream.ts:41](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L41)*

Number of block map ranges read

___

###  rangesVerified

• **rangesVerified**: *number* = 0

*Defined in [lib/read-stream.ts:43](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L43)*

Number of block map ranges verified

___

### `Private` readFn

• **readFn**: *[ReadFunction](../README.md#readfunction)*

*Defined in [lib/read-stream.ts:54](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L54)*

___

###  readable

• **readable**: *boolean*

*Inherited from [FilterStream](filterstream.md).[readable](filterstream.md#readable)*

Defined in node_modules/@types/node/base.d.ts:3688

___

### `Readonly` start

• **start**: *number*

*Defined in [lib/read-stream.ts:61](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L61)*

___

### `Readonly` verify

• **verify**: *boolean*

*Defined in [lib/read-stream.ts:59](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L59)*

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from [FilterStream](filterstream.md).[defaultMaxListeners](filterstream.md#static-defaultmaxlisteners)*

Defined in node_modules/@types/node/base.d.ts:681

## Methods

### `Private` _advanceRange

▸ **_advanceRange**(): *Promise‹void›*

*Defined in [lib/read-stream.ts:215](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L215)*

Advance to next the Range if there is one then read a block;
else end the stream;

**`see`** https://nodejs.org/api/stream.html#stream_implementing_a_readable_stream

**Returns:** *Promise‹void›*

___

### `Private` _prepareRanges

▸ **_prepareRanges**(): *[ReadRange](readrange.md)[]*

*Defined in [lib/read-stream.ts:118](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L118)*

Preprocess the `blockMap`'s ranges into byte-ranges
with respect to the `start` offset, and an `offset`
for tracking chunked range reading

**Returns:** *[ReadRange](readrange.md)[]*

___

###  _read

▸ **_read**(): *Promise‹void›*

*Overrides [FilterStream](filterstream.md).[_read](filterstream.md#_read)*

*Defined in [lib/read-stream.ts:231](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L231)*

Initiate a new read, advancing the range if necessary,
and verifying checksums, if enabled

**`see`** https://nodejs.org/api/stream.html#stream_implementing_a_readable_stream

**Returns:** *Promise‹void›*

___

### `Private` _readBlock

▸ **_readBlock**(): *Promise‹void›*

*Defined in [lib/read-stream.ts:167](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L167)*

Read the current range (or a chunk thereof),
update state and emit the read block

**Returns:** *Promise‹void›*

___

### `Private` _verifyRange

▸ **_verifyRange**(): *void*

*Defined in [lib/read-stream.ts:140](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L140)*

Verify a fully read range's checksum against
the range's checksum from the blockmap

**Returns:** *void*

___

###  addListener

▸ **addListener**(`event`: string, `listener`: Function): *this*

*Inherited from [FilterStream](filterstream.md).[addListener](filterstream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3711

Event emitter
The defined events on documents including:
  1. close
  2. data
  3. end
  4. readable
  5. error

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`listener` | Function |

**Returns:** *this*

▸ **addListener**(`event`: "close", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[addListener](filterstream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3712

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "data", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[addListener](filterstream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3713

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: Buffer | string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | Buffer &#124; string |

**Returns:** *this*

▸ **addListener**(`event`: "end", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[addListener](filterstream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3714

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[addListener](filterstream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3715

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "error", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[addListener](filterstream.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3716

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](readrangeerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](readrangeerror.md#static-error) |

**Returns:** *this*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from [FilterStream](filterstream.md).[emit](filterstream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3718

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

▸ **emit**(`event`: "close"): *boolean*

*Inherited from [FilterStream](filterstream.md).[emit](filterstream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3719

**Parameters:**

Name | Type |
------ | ------ |
`event` | "close" |

**Returns:** *boolean*

▸ **emit**(`event`: "data", `chunk`: Buffer | string): *boolean*

*Inherited from [FilterStream](filterstream.md).[emit](filterstream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3720

**Parameters:**

Name | Type |
------ | ------ |
`event` | "data" |
`chunk` | Buffer &#124; string |

**Returns:** *boolean*

▸ **emit**(`event`: "end"): *boolean*

*Inherited from [FilterStream](filterstream.md).[emit](filterstream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3721

**Parameters:**

Name | Type |
------ | ------ |
`event` | "end" |

**Returns:** *boolean*

▸ **emit**(`event`: "readable"): *boolean*

*Inherited from [FilterStream](filterstream.md).[emit](filterstream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3722

**Parameters:**

Name | Type |
------ | ------ |
`event` | "readable" |

**Returns:** *boolean*

▸ **emit**(`event`: "error", `err`: [Error](readrangeerror.md#static-error)): *boolean*

*Inherited from [FilterStream](filterstream.md).[emit](filterstream.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3723

**Parameters:**

Name | Type |
------ | ------ |
`event` | "error" |
`err` | [Error](readrangeerror.md#static-error) |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *string | symbol[]*

*Inherited from [FilterStream](filterstream.md).[eventNames](filterstream.md#eventnames)*

Defined in node_modules/@types/node/base.d.ts:694

**Returns:** *string | symbol[]*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [FilterStream](filterstream.md).[getMaxListeners](filterstream.md#getmaxlisteners)*

Defined in node_modules/@types/node/base.d.ts:691

**Returns:** *number*

___

###  isPaused

▸ **isPaused**(): *boolean*

*Inherited from [FilterStream](filterstream.md).[isPaused](filterstream.md#ispaused)*

Defined in node_modules/@types/node/base.d.ts:3695

**Returns:** *boolean*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from [FilterStream](filterstream.md).[listenerCount](filterstream.md#static-listenercount)*

Defined in node_modules/@types/node/base.d.ts:695

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from [FilterStream](filterstream.md).[listeners](filterstream.md#listeners)*

Defined in node_modules/@types/node/base.d.ts:692

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  on

▸ **on**(`event`: string, `listener`: Function): *this*

*Inherited from [FilterStream](filterstream.md).[on](filterstream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3725

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`listener` | Function |

**Returns:** *this*

▸ **on**(`event`: "close", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[on](filterstream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3726

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "data", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[on](filterstream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3727

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: Buffer | string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | Buffer &#124; string |

**Returns:** *this*

▸ **on**(`event`: "end", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[on](filterstream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3728

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "readable", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[on](filterstream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3729

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "error", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[on](filterstream.md#on)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3730

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](readrangeerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](readrangeerror.md#static-error) |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string, `listener`: Function): *this*

*Inherited from [FilterStream](filterstream.md).[once](filterstream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3732

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`listener` | Function |

**Returns:** *this*

▸ **once**(`event`: "close", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[once](filterstream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3733

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "data", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[once](filterstream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3734

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: Buffer | string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | Buffer &#124; string |

**Returns:** *this*

▸ **once**(`event`: "end", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[once](filterstream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3735

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "readable", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[once](filterstream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3736

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "error", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[once](filterstream.md#once)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3737

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](readrangeerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](readrangeerror.md#static-error) |

**Returns:** *this*

___

###  pause

▸ **pause**(): *this*

*Inherited from [FilterStream](filterstream.md).[pause](filterstream.md#pause)*

Defined in node_modules/@types/node/base.d.ts:3693

**Returns:** *this*

___

###  pipe

▸ **pipe**‹**T**›(`destination`: T, `options?`: undefined | object): *T*

*Inherited from [FilterStream](filterstream.md).[pipe](filterstream.md#pipe)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3696

**Type parameters:**

▪ **T**: *WritableStream*

**Parameters:**

Name | Type |
------ | ------ |
`destination` | T |
`options?` | undefined &#124; object |

**Returns:** *T*

___

###  prependListener

▸ **prependListener**(`event`: string, `listener`: Function): *this*

*Inherited from [FilterStream](filterstream.md).[prependListener](filterstream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3739

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`listener` | Function |

**Returns:** *this*

▸ **prependListener**(`event`: "close", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[prependListener](filterstream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3740

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "data", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[prependListener](filterstream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3741

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: Buffer | string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | Buffer &#124; string |

**Returns:** *this*

▸ **prependListener**(`event`: "end", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[prependListener](filterstream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3742

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[prependListener](filterstream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3743

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "error", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[prependListener](filterstream.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3744

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](readrangeerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](readrangeerror.md#static-error) |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string, `listener`: Function): *this*

*Inherited from [FilterStream](filterstream.md).[prependOnceListener](filterstream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3746

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`listener` | Function |

**Returns:** *this*

▸ **prependOnceListener**(`event`: "close", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[prependOnceListener](filterstream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3747

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "data", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[prependOnceListener](filterstream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3748

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: Buffer | string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | Buffer &#124; string |

**Returns:** *this*

▸ **prependOnceListener**(`event`: "end", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[prependOnceListener](filterstream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3749

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[prependOnceListener](filterstream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3750

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "error", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[prependOnceListener](filterstream.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3751

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](readrangeerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](readrangeerror.md#static-error) |

**Returns:** *this*

___

###  push

▸ **push**(`chunk`: any, `encoding?`: undefined | string): *boolean*

*Inherited from [FilterStream](filterstream.md).[push](filterstream.md#push)*

Defined in node_modules/@types/node/base.d.ts:3700

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`encoding?` | undefined &#124; string |

**Returns:** *boolean*

___

###  read

▸ **read**(`size?`: undefined | number): *any*

*Inherited from [FilterStream](filterstream.md).[read](filterstream.md#read)*

Defined in node_modules/@types/node/base.d.ts:3691

**Parameters:**

Name | Type |
------ | ------ |
`size?` | undefined &#124; number |

**Returns:** *any*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [FilterStream](filterstream.md).[removeAllListeners](filterstream.md#removealllisteners)*

Defined in node_modules/@types/node/base.d.ts:689

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string, `listener`: Function): *this*

*Inherited from [FilterStream](filterstream.md).[removeListener](filterstream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3753

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`listener` | Function |

**Returns:** *this*

▸ **removeListener**(`event`: "close", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[removeListener](filterstream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3754

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "data", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[removeListener](filterstream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3755

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: Buffer | string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | Buffer &#124; string |

**Returns:** *this*

▸ **removeListener**(`event`: "end", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[removeListener](filterstream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3756

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[removeListener](filterstream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3757

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "error", `listener`: function): *this*

*Inherited from [FilterStream](filterstream.md).[removeListener](filterstream.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/base.d.ts:3758

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: [Error](readrangeerror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](readrangeerror.md#static-error) |

**Returns:** *this*

___

###  resume

▸ **resume**(): *this*

*Inherited from [FilterStream](filterstream.md).[resume](filterstream.md#resume)*

Defined in node_modules/@types/node/base.d.ts:3694

**Returns:** *this*

___

###  setEncoding

▸ **setEncoding**(`encoding`: string): *void*

*Inherited from [FilterStream](filterstream.md).[setEncoding](filterstream.md#setencoding)*

Defined in node_modules/@types/node/base.d.ts:3692

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | string |

**Returns:** *void*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from [FilterStream](filterstream.md).[setMaxListeners](filterstream.md#setmaxlisteners)*

Defined in node_modules/@types/node/base.d.ts:690

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  unpipe

▸ **unpipe**‹**T**›(`destination?`: T): *void*

*Inherited from [FilterStream](filterstream.md).[unpipe](filterstream.md#unpipe)*

Defined in node_modules/@types/node/base.d.ts:3697

**Type parameters:**

▪ **T**: *WritableStream*

**Parameters:**

Name | Type |
------ | ------ |
`destination?` | T |

**Returns:** *void*

___

###  unshift

▸ **unshift**(`chunk`: any): *void*

*Inherited from [FilterStream](filterstream.md).[unshift](filterstream.md#unshift)*

Defined in node_modules/@types/node/base.d.ts:3698

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *void*

___

###  wrap

▸ **wrap**(`oldStream`: ReadableStream): *Readable*

*Inherited from [FilterStream](filterstream.md).[wrap](filterstream.md#wrap)*

Defined in node_modules/@types/node/base.d.ts:3699

**Parameters:**

Name | Type |
------ | ------ |
`oldStream` | ReadableStream |

**Returns:** *Readable*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from [FilterStream](filterstream.md).[listenerCount](filterstream.md#static-listenercount)*

Defined in node_modules/@types/node/base.d.ts:680

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
