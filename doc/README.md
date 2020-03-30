
#  blockmap

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

* [ReadFunction](#readfunction)

### Variables

* [debug](#debug)

### Functions

* [close](#close)
* [firstChild](#firstchild)
* [firstChildThrow](#firstchildthrow)
* [getAttribute](#getattribute)
* [getAttributeThrow](#getattributethrow)
* [getRanges](#getranges)
* [getText](#gettext)
* [maskChecksum](#maskchecksum)
* [open](#open)
* [parse](#parse)
* [textContent](#textcontent)
* [textContentThrow](#textcontentthrow)
* [withOpenFile](#withopenfile)
* [xmlTag](#xmltag)

---

## Type aliases

<a id="readfunction"></a>

###  ReadFunction

**Ƭ ReadFunction**: *`function`*

*Defined in [read-stream.ts:30](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/read-stream.ts#L30)*

#### Type declaration
▸(buffer: *`Buffer`*, offset: *`number`*, length: *`number`*, position: *`number`*): `Promise`<`object`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| buffer | `Buffer` |
| offset | `number` |
| length | `number` |
| position | `number` |

**Returns:** `Promise`<`object`>

___

## Variables

<a id="debug"></a>

### `<Const>` debug

**● debug**: *`Debugger`* =  debug$('blockmap:readstream')

*Defined in [filter-stream.ts:26](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/filter-stream.ts#L26)*
*Defined in [read-stream.ts:28](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/read-stream.ts#L28)*

___

## Functions

<a id="close"></a>

###  close

▸ **close**(fd: *`number`*): `Promise`<`void`>

*Defined in [utils.ts:32](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/utils.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fd | `number` |

**Returns:** `Promise`<`void`>

___
<a id="firstchild"></a>

###  firstChild

▸ **firstChild**(element: *`Element`*, name: *`string`*): `Element` \| `undefined`

*Defined in [parse.ts:23](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/parse.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | `Element` |
| name | `string` |

**Returns:** `Element` \| `undefined`

___
<a id="firstchildthrow"></a>

###  firstChildThrow

▸ **firstChildThrow**(element: *`Element`*, name: *`string`*): `Element`

*Defined in [parse.ts:29](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/parse.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | `Element` |
| name | `string` |

**Returns:** `Element`

___
<a id="getattribute"></a>

###  getAttribute

▸ **getAttribute**(element: *`Element`*, name: *`string`*): `string` \| `number` \| `undefined`

*Defined in [parse.ts:37](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/parse.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | `Element` |
| name | `string` |

**Returns:** `string` \| `number` \| `undefined`

___
<a id="getattributethrow"></a>

###  getAttributeThrow

▸ **getAttributeThrow**(element: *`Element`*, name: *`string`*): `string` \| `number`

*Defined in [parse.ts:46](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/parse.ts#L46)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | `Element` |
| name | `string` |

**Returns:** `string` \| `number`

___
<a id="getranges"></a>

###  getRanges

▸ **getRanges**(element: *`Element`*): [BlockMapOptionsRange](interfaces/blockmapoptionsrange.md)[]

*Defined in [parse.ts:78](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/parse.ts#L78)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | `Element` |

**Returns:** [BlockMapOptionsRange](interfaces/blockmapoptionsrange.md)[]

___
<a id="gettext"></a>

###  getText

▸ **getText**(element: *`Element` \| `Element`[]*): `string`

*Defined in [parse.ts:54](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/parse.ts#L54)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | `Element` \| `Element`[] |

**Returns:** `string`

___
<a id="maskchecksum"></a>

###  maskChecksum

▸ **maskChecksum**(value: *`string`*): `string`

*Defined in [parse.ts:109](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/parse.ts#L109)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |

**Returns:** `string`

___
<a id="open"></a>

###  open

▸ **open**(filename: *`string`*): `Promise`<`number`>

*Defined in [utils.ts:20](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/utils.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filename | `string` |

**Returns:** `Promise`<`number`>

___
<a id="parse"></a>

###  parse

▸ **parse**(value: *`string` \| `Buffer`*, verify?: *`boolean`*): [BlockMapOptions](interfaces/blockmapoptions.md)

*Defined in [parse.ts:120](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/parse.ts#L120)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| value | `string` \| `Buffer` | - |
| `Default value` verify | `boolean` | true |

**Returns:** [BlockMapOptions](interfaces/blockmapoptions.md)

___
<a id="textcontent"></a>

###  textContent

▸ **textContent**(element: *`Element`*, name: *`string`*): `string` \| `undefined`

*Defined in [parse.ts:71](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/parse.ts#L71)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | `Element` |
| name | `string` |

**Returns:** `string` \| `undefined`

___
<a id="textcontentthrow"></a>

###  textContentThrow

▸ **textContentThrow**(element: *`Element`*, name: *`string`*): `string`

*Defined in [parse.ts:67](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/parse.ts#L67)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | `Element` |
| name | `string` |

**Returns:** `string`

___
<a id="withopenfile"></a>

###  withOpenFile

▸ **withOpenFile**(filename: *`string`*, fn: *`function`*): `Promise`<`void`>

*Defined in [utils.ts:44](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/utils.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filename | `string` |
| fn | `function` |

**Returns:** `Promise`<`void`>

___
<a id="xmltag"></a>

###  xmlTag

▸ **xmlTag**(tag: *`string`*, text: *`string`*): `string`

*Defined in [blockmap.ts:24](https://github.com/balena-io-modules/blockmap/blob/cb8180a/lib/blockmap.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tag | `string` |
| text | `string` |

**Returns:** `string`

___

