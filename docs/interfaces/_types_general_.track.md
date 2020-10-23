**[rem-track-hunter](../README.md)**

> [Globals](../globals.md) / ["types/general"](../modules/_types_general_.md) / Track

# Interface: Track

## Hierarchy

* **Track**

## Index

### Properties

* [artist](_types_general_.track.md#artist)
* [duration](_types_general_.track.md#duration)
* [identifier](_types_general_.track.md#identifier)
* [name](_types_general_.track.md#name)
* [seekedTime](_types_general_.track.md#seekedtime)
* [show](_types_general_.track.md#show)
* [type](_types_general_.track.md#type)

### Methods

* [getYtUrl](_types_general_.track.md#getyturl)

## Properties

### artist

• `Optional` **artist**: undefined \| string

*Defined in types/general.ts:11*

___

### duration

• `Optional` **duration**: undefined \| number

*Defined in types/general.ts:10*

___

### identifier

•  **identifier**: string

*Defined in types/general.ts:7*

___

### name

•  **name**: string

*Defined in types/general.ts:5*

___

### seekedTime

• `Optional` **seekedTime**: undefined \| number

*Defined in types/general.ts:9*

___

### show

• `Optional` **show**: undefined \| string

*Defined in types/general.ts:12*

___

### type

•  **type**: [trackType](../modules/_types_general_.md#tracktype)

*Defined in types/general.ts:6*

## Methods

### getYtUrl

▸ `Optional`**getYtUrl**(`keywordOrUrl`: string): Promise\<string \| false>

*Defined in types/general.ts:8*

#### Parameters:

Name | Type |
------ | ------ |
`keywordOrUrl` | string |

**Returns:** Promise\<string \| false>
