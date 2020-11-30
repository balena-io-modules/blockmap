[blockmap](README.md)

# blockmap

## Index

### Classes

* [BlockMap](classes/blockmap.md)
* [Chunk](classes/chunk.md)
* [FilterStream](classes/filterstream.md)
* [Range](classes/range.md)
* [ReadRange](classes/readrange.md)
* [ReadRangeError](classes/readrangeerror.md)
* [ReadStream](classes/readstream.md)

### Interfaces

* [BlockMapOptions](interfaces/blockmapoptions.md)
* [BlockMapOptionsRange](interfaces/blockmapoptionsrange.md)

### Type aliases

* [ReadFunction](README.md#readfunction)

### Variables

* [debug](README.md#const-debug)

### Functions

* [close](README.md#close)
* [firstChild](README.md#firstchild)
* [firstChildThrow](README.md#firstchildthrow)
* [getAttribute](README.md#getattribute)
* [getAttributeThrow](README.md#getattributethrow)
* [getRanges](README.md#getranges)
* [getText](README.md#gettext)
* [maskChecksum](README.md#maskchecksum)
* [open](README.md#open)
* [parse](README.md#parse)
* [textContent](README.md#textcontent)
* [textContentThrow](README.md#textcontentthrow)
* [withOpenFile](README.md#withopenfile)
* [xmlTag](README.md#xmltag)

## Type aliases

###  ReadFunction

Ƭ **ReadFunction**: *function*

*Defined in [lib/read-stream.ts:30](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L30)*

#### Type declaration:

▸ (`buffer`: Buffer, `offset`: number, `length`: number, `position`: number): *Promise‹object›*

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | Buffer |
`offset` | number |
`length` | number |
`position` | number |

## Variables

### `Const` debug

• **debug**: *Debugger* = debug$('blockmap:readstream')

*Defined in [lib/filter-stream.ts:26](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/filter-stream.ts#L26)*

*Defined in [lib/read-stream.ts:28](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-stream.ts#L28)*

## Functions

###  close

▸ **close**(`fd`: number): *Promise‹void›*

*Defined in [lib/utils.ts:32](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/utils.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`fd` | number |

**Returns:** *Promise‹void›*

___

###  firstChild

▸ **firstChild**(`element`: Element, `name`: string): *Element | undefined*

*Defined in [lib/parse.ts:23](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/parse.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |
`name` | string |

**Returns:** *Element | undefined*

___

###  firstChildThrow

▸ **firstChildThrow**(`element`: Element, `name`: string): *Element*

*Defined in [lib/parse.ts:29](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/parse.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |
`name` | string |

**Returns:** *Element*

___

###  getAttribute

▸ **getAttribute**(`element`: Element, `name`: string): *string | number | undefined*

*Defined in [lib/parse.ts:37](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/parse.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |
`name` | string |

**Returns:** *string | number | undefined*

___

###  getAttributeThrow

▸ **getAttributeThrow**(`element`: Element, `name`: string): *string | number*

*Defined in [lib/parse.ts:46](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/parse.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |
`name` | string |

**Returns:** *string | number*

___

###  getRanges

▸ **getRanges**(`element`: Element): *[BlockMapOptionsRange](interfaces/blockmapoptionsrange.md)[]*

*Defined in [lib/parse.ts:78](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/parse.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |

**Returns:** *[BlockMapOptionsRange](interfaces/blockmapoptionsrange.md)[]*

___

###  getText

▸ **getText**(`element`: Element | Element[]): *string*

*Defined in [lib/parse.ts:54](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/parse.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element &#124; Element[] |

**Returns:** *string*

___

###  maskChecksum

▸ **maskChecksum**(`value`: string): *string*

*Defined in [lib/parse.ts:107](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/parse.ts#L107)*

Zero out the file checksum field for checksum calculation

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *string*

___

###  open

▸ **open**(`filename`: string): *Promise‹number›*

*Defined in [lib/utils.ts:20](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/utils.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`filename` | string |

**Returns:** *Promise‹number›*

___

###  parse

▸ **parse**(`value`: string | Buffer, `verify`: boolean): *[BlockMapOptions](interfaces/blockmapoptions.md)*

*Defined in [lib/parse.ts:118](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/parse.ts#L118)*

Parse a .bmap file

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`value` | string &#124; Buffer | - |
`verify` | boolean | true |

**Returns:** *[BlockMapOptions](interfaces/blockmapoptions.md)*

___

###  textContent

▸ **textContent**(`element`: Element, `name`: string): *string | undefined*

*Defined in [lib/parse.ts:71](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/parse.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |
`name` | string |

**Returns:** *string | undefined*

___

###  textContentThrow

▸ **textContentThrow**(`element`: Element, `name`: string): *string*

*Defined in [lib/parse.ts:67](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/parse.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |
`name` | string |

**Returns:** *string*

___

###  withOpenFile

▸ **withOpenFile**(`filename`: string, `fn`: function): *Promise‹void›*

*Defined in [lib/utils.ts:44](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/utils.ts#L44)*

**Parameters:**

▪ **filename**: *string*

▪ **fn**: *function*

▸ (`fd`: number): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`fd` | number |

**Returns:** *Promise‹void›*

___

###  xmlTag

▸ **xmlTag**(`tag`: string, `text`: string): *string*

*Defined in [lib/blockmap.ts:24](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/blockmap.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`text` | string |

**Returns:** *string*
