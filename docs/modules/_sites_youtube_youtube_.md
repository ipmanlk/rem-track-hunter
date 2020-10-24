**[@ipmanlk/rem-track-hunter](../README.md)**

> [Globals](../globals.md) / "sites/youtube/youtube"

# Module: "sites/youtube/youtube"

## Index

### Functions

* [getSecondsFromYtLabel](_sites_youtube_youtube_.md#getsecondsfromytlabel)
* [getTracks](_sites_youtube_youtube_.md#gettracks)

## Functions

### getSecondsFromYtLabel

▸ **getSecondsFromYtLabel**(`label`: string): number \| false

*Defined in [sites/youtube/youtube.ts:72](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/sites/youtube/youtube.ts#L72)*

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

*Defined in [sites/youtube/youtube.ts:7](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/sites/youtube/youtube.ts#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`keywordOrUrl` | string |

**Returns:** Promise\<Array\<[Track](../interfaces/_types_general_.track.md)>>
