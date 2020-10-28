**[@ipmanlk/rem-track-hunter](../README.md)**

> [Globals](../globals.md) / "util/cache"

# Module: "util/cache"

## Index

### Variables

* [cacheDir](_util_cache_.md#cachedir)
* [dbPath](_util_cache_.md#dbpath)
* [sqlite3](_util_cache_.md#sqlite3)

### Functions

* [getConnection](_util_cache_.md#getconnection)
* [getSpotifyTracks](_util_cache_.md#getspotifytracks)
* [getTracks](_util_cache_.md#gettracks)
* [getValue](_util_cache_.md#getvalue)
* [initializeDatabase](_util_cache_.md#initializedatabase)
* [saveSpotifyTracks](_util_cache_.md#savespotifytracks)
* [saveTracks](_util_cache_.md#savetracks)
* [saveValue](_util_cache_.md#savevalue)

## Variables

### cacheDir

• `Const` **cacheDir**: string = \`${process.cwd()}/cache\`

*Defined in [util/cache.ts:8](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/util/cache.ts#L8)*

___

### dbPath

• `Const` **dbPath**: string = \`${cacheDir}/cache.db\`

*Defined in [util/cache.ts:9](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/util/cache.ts#L9)*

___

### sqlite3

• `Const` **sqlite3**: any = require("sqlite3").verbose()

*Defined in [util/cache.ts:6](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/util/cache.ts#L6)*

## Functions

### getConnection

▸ **getConnection**(): any

*Defined in [util/cache.ts:189](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/util/cache.ts#L189)*

**`internal`** 

**Returns:** any

___

### getSpotifyTracks

▸ **getSpotifyTracks**(`key`: string): Promise\<Array\<[Track](../interfaces/_types_general_.track.md)>>

*Defined in [util/cache.ts:165](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/util/cache.ts#L165)*

* Spotify tracks requires special handling because they contain callback function to retrieve Youtube url.

**`internal`** 

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |

**Returns:** Promise\<Array\<[Track](../interfaces/_types_general_.track.md)>>

___

### getTracks

▸ **getTracks**(`table`: Database.Table, `key`: string): Promise\<Array\<[Track](../interfaces/_types_general_.track.md)>>

*Defined in [util/cache.ts:118](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/util/cache.ts#L118)*

* This is a general purpose function for retrieving an array of tracks.
! Do not use for spotify tracks.

**`internal`** 

#### Parameters:

Name | Type |
------ | ------ |
`table` | Database.Table |
`key` | string |

**Returns:** Promise\<Array\<[Track](../interfaces/_types_general_.track.md)>>

___

### getValue

▸ **getValue**(`table`: Database.Table, `key`: string): Promise\<string>

*Defined in [util/cache.ts:66](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/util/cache.ts#L66)*

* This is a general purpose function. Use with caution.
! Do not use for spotify tracks.

**`internal`** 

#### Parameters:

Name | Type |
------ | ------ |
`table` | Database.Table |
`key` | string |

**Returns:** Promise\<string>

___

### initializeDatabase

▸ **initializeDatabase**(): void

*Defined in [util/cache.ts:14](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/util/cache.ts#L14)*

* This will create a database in process.cwd()/cache directory, if it doesn't exist.

**`internal`** 

**Returns:** void

___

### saveSpotifyTracks

▸ **saveSpotifyTracks**(`key`: string, `tracks`: Array\<[Track](../interfaces/_types_general_.track.md)>): Promise\<void>

*Defined in [util/cache.ts:147](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/util/cache.ts#L147)*

* Spotify tracks requires special handling because they contain callback function to retrieve Youtube url.

**`internal`** 

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |
`tracks` | Array\<[Track](../interfaces/_types_general_.track.md)> |

**Returns:** Promise\<void>

___

### saveTracks

▸ **saveTracks**(`table`: Database.Table, `key`: string, `value`: Array\<[Track](../interfaces/_types_general_.track.md)>): Promise\<void>

*Defined in [util/cache.ts:93](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/util/cache.ts#L93)*

* This is a general purpose function for saving an array of tracks.
! Do not use for spotify tracks.

**`internal`** 

#### Parameters:

Name | Type |
------ | ------ |
`table` | Database.Table |
`key` | string |
`value` | Array\<[Track](../interfaces/_types_general_.track.md)> |

**Returns:** Promise\<void>

___

### saveValue

▸ **saveValue**(`table`: Database.Table, `key`: string, `value`: string): Promise\<void>

*Defined in [util/cache.ts:41](https://github.com/ipmanlk/rem-track-hunter/blob/89e99c1/lib/util/cache.ts#L41)*

* This is a general purpose function. Use with caution.
! Do not use for spotify tracks.

**`internal`** 

#### Parameters:

Name | Type |
------ | ------ |
`table` | Database.Table |
`key` | string |
`value` | string |

**Returns:** Promise\<void>
