**[@ipmanlk/rem-track-hunter](../README.md)**

> [Globals](../globals.md) / "general/common"

# Module: "general/common"

## Index

### Functions

* [getUrlType](_general_common_.md#geturltype)
* [getYoutubeUrl](_general_common_.md#getyoutubeurl)
* [searchSearx](_general_common_.md#searchsearx)

## Functions

### getUrlType

▸ **getUrlType**(`url`: string): General.urlType \| false

*Defined in [general/common.ts:10](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/general/common.ts#L10)*

**`internal`** 

#### Parameters:

Name | Type |
------ | ------ |
`url` | string |

**Returns:** General.urlType \| false

___

### getYoutubeUrl

▸ **getYoutubeUrl**(`keyword`: string): Promise\<string \| false>

*Defined in [general/common.ts:26](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/general/common.ts#L26)*

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`keyword` | string | Name or title to search on Youtube. |

**Returns:** Promise\<string \| false>

Will resolve the URL of first search result

___

### searchSearx

▸ **searchSearx**(`keyword`: string): Promise\<string \| false>

*Defined in [general/common.ts:61](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/general/common.ts#L61)*

This will use as a fallback when ytsr fails to retrieve a link

**`internal`** 

#### Parameters:

Name | Type |
------ | ------ |
`keyword` | string |

**Returns:** Promise\<string \| false>
