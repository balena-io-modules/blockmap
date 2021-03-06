[blockmap](../README.md) › [FilterStream](filterstream.md)

# Class: FilterStream

## Hierarchy

* Transform

  ↳ **FilterStream**

## Implements

* ReadableStream
* Writable

## Index

### Constructors

* [constructor](filterstream.md#constructor)

### Properties

* [_bytes](filterstream.md#private-_bytes)
* [_chunks](filterstream.md#private-_chunks)
* [_hash](filterstream.md#private-optional-_hash)
* [blockMap](filterstream.md#readonly-blockmap)
* [blocksRead](filterstream.md#blocksread)
* [blocksWritten](filterstream.md#blockswritten)
* [bytesRead](filterstream.md#bytesread)
* [bytesWritten](filterstream.md#byteswritten)
* [chunkSize](filterstream.md#readonly-chunksize)
* [currentRange](filterstream.md#optional-currentrange)
* [generateChecksums](filterstream.md#readonly-generatechecksums)
* [position](filterstream.md#position)
* [ranges](filterstream.md#ranges)
* [rangesRead](filterstream.md#rangesread)
* [rangesVerified](filterstream.md#rangesverified)
* [readable](filterstream.md#readable)
* [verify](filterstream.md#readonly-verify)
* [writable](filterstream.md#writable)
* [defaultMaxListeners](filterstream.md#static-defaultmaxlisteners)

### Methods

* [_flush](filterstream.md#_flush)
* [_getByteRangesFromBlockMap](filterstream.md#private-_getbyterangesfromblockmap)
* [_rangeInChunk](filterstream.md#private-_rangeinchunk)
* [_read](filterstream.md#_read)
* [_transform](filterstream.md#_transform)
* [_transformBlock](filterstream.md#private-_transformblock)
* [_verifyRange](filterstream.md#private-_verifyrange)
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
* [listenerCount](filterstream.md#static-listenercount)

## Constructors

###  constructor

\+ **new FilterStream**(`blockMap`: [BlockMap](blockmap.md), `verify`: boolean, `generateChecksums`: boolean, `chunkSize`: number): *[FilterStream](filterstream.md)*

*Overrides void*

*Defined in [lib/filter-stream.ts:50](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L50)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`blockMap` | [BlockMap](blockmap.md) | - |
`verify` | boolean | true |
`generateChecksums` | boolean | false |
`chunkSize` | number | 64 * 1024 |

**Returns:** *[FilterStream](filterstream.md)*

## Properties

### `Private` _bytes

• **_bytes**: *number* = 0

*Defined in [lib/filter-stream.ts:50](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L50)*

___

### `Private` _chunks

• **_chunks**: *Buffer[]* = []

*Defined in [lib/filter-stream.ts:49](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L49)*

___

### `Private` `Optional` _hash

• **_hash**? : *Hash*

*Defined in [lib/filter-stream.ts:48](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L48)*

Hash stream to calculate range checksums

___

### `Readonly` blockMap

• **blockMap**: *[BlockMap](blockmap.md)*

*Defined in [lib/filter-stream.ts:53](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L53)*

___

###  blocksRead

• **blocksRead**: *number* = 0

*Defined in [lib/filter-stream.ts:34](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L34)*

Number of blocks read

___

###  blocksWritten

• **blocksWritten**: *number* = 0

*Defined in [lib/filter-stream.ts:38](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L38)*

Number of bytes written

___

###  bytesRead

• **bytesRead**: *number* = 0

*Defined in [lib/filter-stream.ts:36](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L36)*

Number of bytes read

___

###  bytesWritten

• **bytesWritten**: *number* = 0

*Defined in [lib/filter-stream.ts:40](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L40)*

Number of bytes written

___

### `Readonly` chunkSize

• **chunkSize**: *number*

*Defined in [lib/filter-stream.ts:56](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L56)*

___

### `Optional` currentRange

• **currentRange**? : *[ReadRange](readrange.md)*

*Defined in [lib/filter-stream.ts:46](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L46)*

Range being currently processed

___

### `Readonly` generateChecksums

• **generateChecksums**: *boolean*

*Defined in [lib/filter-stream.ts:55](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L55)*

___

###  position

• **position**: *number* = 0

*Defined in [lib/filter-stream.ts:42](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L42)*

Current offset in bytes

___

###  ranges

• **ranges**: *[ReadRange](readrange.md)[]*

*Defined in [lib/filter-stream.ts:44](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L44)*

___

###  rangesRead

• **rangesRead**: *number* = 0

*Defined in [lib/filter-stream.ts:30](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L30)*

Number of block map ranges read

___

###  rangesVerified

• **rangesVerified**: *number* = 0

*Defined in [lib/filter-stream.ts:32](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L32)*

Number of block map ranges verified

___

###  readable

• **readable**: *boolean*

*Inherited from [FilterStream](filterstream.md).[readable](filterstream.md#readable)*

Defined in node_modules/@types/node/base.d.ts:3688

___

### `Readonly` verify

• **verify**: *boolean*

*Defined in [lib/filter-stream.ts:54](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L54)*

___

###  writable

• **writable**: *boolean*

*Inherited from [FilterStream](filterstream.md).[writable](filterstream.md#writable)*

Defined in node_modules/@types/node/base.d.ts:3855

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from [FilterStream](filterstream.md).[defaultMaxListeners](filterstream.md#static-defaultmaxlisteners)*

Defined in node_modules/@types/node/base.d.ts:681

## Methods

###  _flush

▸ **_flush**(`done`: function): *void*

*Defined in [lib/filter-stream.ts:252](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L252)*

Flush out any unprocessed chunks from
the internal buffer once the stream is being ended

**Parameters:**

▪ **done**: *function*

▸ (): *void*

**Returns:** *void*

___

### `Private` _getByteRangesFromBlockMap

▸ **_getByteRangesFromBlockMap**(): *[ReadRange](readrange.md)‹›[]*

*Defined in [lib/filter-stream.ts:77](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L77)*

Preprocess the `blockMap`'s ranges into byte-ranges
with respect to the `start` offset, and an `offset`
for tracking chunked range reading

**Returns:** *[ReadRange](readrange.md)‹›[]*

___

### `Private` _rangeInChunk

▸ **_rangeInChunk**(`chunk`: Buffer): *boolean*

*Defined in [lib/filter-stream.ts:116](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L116)*

Determine whether a chunk is in the current range

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | Buffer |

**Returns:** *boolean*

___

###  _read

▸ **_read**(`size`: number): *void*

*Inherited from [FilterStream](filterstream.md).[_read](filterstream.md#_read)*

Defined in node_modules/@types/node/base.d.ts:3690

**Parameters:**

Name | Type |
------ | ------ |
`size` | number |

**Returns:** *void*

___

###  _transform

▸ **_transform**(`chunk`: Buffer, `_encoding`: string, `next`: function): *void*

*Overrides void*

*Defined in [lib/filter-stream.ts:204](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L204)*

Transform input into block-sized chunks

**Parameters:**

▪ **chunk**: *Buffer*

▪ **_encoding**: *string*

▪ **next**: *function*

▸ (): *void*

**Returns:** *void*

___

### `Private` _transformBlock

▸ **_transformBlock**(`chunk`: Buffer, `next`: function): *void*

*Defined in [lib/filter-stream.ts:135](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L135)*

Chunk a given input buffer into blocks
matching the blockSize and advance the
current range, if necessary

**Parameters:**

▪ **chunk**: *Buffer*

▪ **next**: *function*

▸ (): *void*

**Returns:** *void*

___

### `Private` _verifyRange

▸ **_verifyRange**(): *void*

*Defined in [lib/filter-stream.ts:89](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L89)*

Verify a fully read range's checksum against
the range's checksum from the blockmap
or calculate the range's checksum and update the blockmap
if options.generateChecksums is true.

**Returns:** *void*

___

###  _write

▸ **_write**(`chunk`: any, `encoding`: string, `callback`: Function): *void*

*Inherited from [FilterStream](filterstream.md).[_write](filterstream.md#_write)*

Defined in node_modules/@types/node/base.d.ts:3857

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`encoding` | string |
`callback` | Function |

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

###  end

▸ **end**(`cb?`: Function): *void*

*Inherited from [FilterStream](filterstream.md).[end](filterstream.md#end)*

Defined in node_modules/@types/node/base.d.ts:3861

**Parameters:**

Name | Type |
------ | ------ |
`cb?` | Function |

**Returns:** *void*

▸ **end**(`chunk`: any, `cb?`: Function): *void*

*Inherited from [FilterStream](filterstream.md).[end](filterstream.md#end)*

Defined in node_modules/@types/node/base.d.ts:3862

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`cb?` | Function |

**Returns:** *void*

▸ **end**(`chunk`: any, `encoding?`: undefined | string, `cb?`: Function): *void*

*Inherited from [FilterStream](filterstream.md).[end](filterstream.md#end)*

Defined in node_modules/@types/node/base.d.ts:3863

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`encoding?` | undefined &#124; string |
`cb?` | Function |

**Returns:** *void*

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

###  setDefaultEncoding

▸ **setDefaultEncoding**(`encoding`: string): *this*

*Inherited from [FilterStream](filterstream.md).[setDefaultEncoding](filterstream.md#setdefaultencoding)*

Defined in node_modules/@types/node/base.d.ts:3860

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | string |

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

###  write

▸ **write**(`chunk`: any, `cb?`: Function): *boolean*

*Inherited from [FilterStream](filterstream.md).[write](filterstream.md#write)*

Defined in node_modules/@types/node/base.d.ts:3858

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`cb?` | Function |

**Returns:** *boolean*

▸ **write**(`chunk`: any, `encoding?`: undefined | string, `cb?`: Function): *boolean*

*Inherited from [FilterStream](filterstream.md).[write](filterstream.md#write)*

Defined in node_modules/@types/node/base.d.ts:3859

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`encoding?` | undefined &#124; string |
`cb?` | Function |

**Returns:** *boolean*

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
