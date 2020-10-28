**[@ipmanlk/rem-track-hunter](../README.md)**

> [Globals](../globals.md) / "sites/youtube/youtube"

# Module: "sites/youtube/youtube"

## Index

### Functions

* [getSecondsFromYtLabel](_sites_youtube_youtube_.md#getsecondsfromytlabel)
* [getTracks](_sites_youtube_youtube_.md#gettracks)
* [getYoutubeUrl](_sites_youtube_youtube_.md#getyoutubeurl)
* [searchStartpage](_sites_youtube_youtube_.md#searchstartpage)

## Functions

### getSecondsFromYtLabel

▸ **getSecondsFromYtLabel**(`label`: string): number \| false

*Defined in [sites/youtube/youtube.ts:155](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/sites/youtube/youtube.ts#L155)*

This will parse youtube time label (HH:mm:ss) and return seconds or false if parse failed

**`internal`** 

#### Parameters:

Name | Type |
------ | ------ |
`label` | string |

**Returns:** number \| false

___

### getTracks

▸ **getTracks**(`keywordOrUrl`: string): Promise\<Array\<[Track](../interfaces/_types_general_.track.md)>>

*Defined in [sites/youtube/youtube.ts:10](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/sites/youtube/youtube.ts#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`keywordOrUrl` | string |

**Returns:** Promise\<Array\<[Track](../interfaces/_types_general_.track.md)>>

___

### getYoutubeUrl

▸ **getYoutubeUrl**(`keyword`: string): Promise\<string \| false>

*Defined in [sites/youtube/youtube.ts:92](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/sites/youtube/youtube.ts#L92)*

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`keyword` | string | Name or title to search on Youtube. |

**Returns:** Promise\<string \| false>

Will resolve the URL of first search result

___

### searchStartpage

▸ **searchStartpage**(`keyword`: string): Promise\<string \| false>

*Defined in [sites/youtube/youtube.ts:124](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/sites/youtube/youtube.ts#L124)*

This will use as a fallback when ytsr fails to retrieve a link

**`internal`** 

#### Parameters:

Name | Type |
------ | ------ |
`keyword` | string |

**Returns:** Promise\<string \| false>
