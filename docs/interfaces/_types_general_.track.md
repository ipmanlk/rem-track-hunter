**[@ipmanlk/rem-track-hunter](../README.md)**

> [Globals](../globals.md) / ["types/general"](../modules/_types_general_.md) / Track

# Interface: Track

## Hierarchy

* **Track**

## Index

### Properties

* [artist](_types_general_.track.md#artist)
* [duration](_types_general_.track.md#duration)
* [name](_types_general_.track.md#name)
* [seekedTime](_types_general_.track.md#seekedtime)
* [show](_types_general_.track.md#show)
* [type](_types_general_.track.md#type)
* [uri](_types_general_.track.md#uri)

### Methods

* [getYtUrl](_types_general_.track.md#getyturl)

## Properties

### artist

• `Optional` **artist**: undefined \| string

*Defined in [types/general.ts:11](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/types/general.ts#L11)*

___

### duration

• `Optional` **duration**: undefined \| number

*Defined in [types/general.ts:10](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/types/general.ts#L10)*

___

### name

•  **name**: string

*Defined in [types/general.ts:5](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/types/general.ts#L5)*

___

### seekedTime

• `Optional` **seekedTime**: undefined \| number

*Defined in [types/general.ts:9](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/types/general.ts#L9)*

___

### show

• `Optional` **show**: undefined \| string

*Defined in [types/general.ts:12](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/types/general.ts#L12)*

___

### type

•  **type**: [trackType](../modules/_types_general_.md#tracktype)

*Defined in [types/general.ts:6](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/types/general.ts#L6)*

___

### uri

•  **uri**: string

*Defined in [types/general.ts:7](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/types/general.ts#L7)*

## Methods

### getYtUrl

▸ `Optional`**getYtUrl**(`keywordOrUrl`: string): Promise\<string \| false>

*Defined in [types/general.ts:8](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/types/general.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`keywordOrUrl` | string |

**Returns:** Promise\<string \| false>
