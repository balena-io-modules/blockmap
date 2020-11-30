[blockmap](../README.md) › [ReadRangeError](readrangeerror.md)

# Class: ReadRangeError

## Hierarchy

* [Error](readrangeerror.md#static-error)

  ↳ **ReadRangeError**

## Index

### Constructors

* [constructor](readrangeerror.md#constructor)

### Properties

* [checksum](readrangeerror.md#optional-checksum)
* [message](readrangeerror.md#message)
* [name](readrangeerror.md#name)
* [range](readrangeerror.md#readonly-range)
* [stack](readrangeerror.md#optional-stack)
* [Error](readrangeerror.md#static-error)

## Constructors

###  constructor

\+ **new ReadRangeError**(`message`: string, `range`: [ReadRange](readrange.md), `checksum?`: undefined | string): *[ReadRangeError](readrangeerror.md)*

*Defined in [lib/read-range.ts:46](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`range` | [ReadRange](readrange.md) |
`checksum?` | undefined &#124; string |

**Returns:** *[ReadRangeError](readrangeerror.md)*

## Properties

### `Optional` checksum

• **checksum**? : *undefined | string*

*Defined in [lib/read-range.ts:50](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L50)*

___

###  message

• **message**: *string*

*Inherited from [ReadRangeError](readrangeerror.md).[message](readrangeerror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [ReadRangeError](readrangeerror.md).[name](readrangeerror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Readonly` range

• **range**: *[ReadRange](readrange.md)*

*Defined in [lib/read-range.ts:49](https://github.com/balena-io-modules/blockmap/blob/8429cdf/lib/read-range.ts#L49)*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [ReadRangeError](readrangeerror.md).[stack](readrangeerror.md#optional-stack)*

*Overrides [ReadRangeError](readrangeerror.md).[stack](readrangeerror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984
