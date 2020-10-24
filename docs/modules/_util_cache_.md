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
* [getSpotifyValue](_util_cache_.md#getspotifyvalue)
* [getValue](_util_cache_.md#getvalue)
* [initializeDatabase](_util_cache_.md#initializedatabase)
* [saveSpotifyTracks](_util_cache_.md#savespotifytracks)
* [saveValue](_util_cache_.md#savevalue)

## Variables

### cacheDir

• `Const` **cacheDir**: string = \`${process.cwd()}/cache\`

*Defined in [util/cache.ts:8](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/util/cache.ts#L8)*

___

### dbPath

• `Const` **dbPath**: string = \`${cacheDir}/cache.db\`

*Defined in [util/cache.ts:9](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/util/cache.ts#L9)*

___

### sqlite3

• `Const` **sqlite3**: any = require("sqlite3").verbose()

*Defined in [util/cache.ts:6](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/util/cache.ts#L6)*

## Functions

### getConnection

▸ **getConnection**(): any

*Defined in [util/cache.ts:129](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/util/cache.ts#L129)*

**`internal`** 

**Returns:** any

___

### getSpotifyValue

▸ **getSpotifyValue**(`key`: string): Promise\<Array\<[Track](../interfaces/_types_general_.track.md)>>

*Defined in [util/cache.ts:102](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/util/cache.ts#L102)*

* Spotify tracks requires special handling because they contain callback function to retrieve Youtube url.

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |

**Returns:** Promise\<Array\<[Track](../interfaces/_types_general_.track.md)>>

___

### getValue

▸ **getValue**(`table`: Database.Table, `key`: string): Promise\<string>

*Defined in [util/cache.ts:62](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/util/cache.ts#L62)*

* This is a general purpose function. Use with caution.
! Do not use for spotify tracks.

#### Parameters:

Name | Type |
------ | ------ |
`table` | Database.Table |
`key` | string |

**Returns:** Promise\<string>

___

### initializeDatabase

▸ **initializeDatabase**(): void

*Defined in [util/cache.ts:13](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/util/cache.ts#L13)*

* This will create a database in process.cwd()/cache directory, if it doesn't exist.

**Returns:** void

___

### saveSpotifyTracks

▸ **saveSpotifyTracks**(`key`: string, `tracks`: Array\<[Track](../interfaces/_types_general_.track.md)>): Promise\<void>

*Defined in [util/cache.ts:85](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/util/cache.ts#L85)*

* Spotify tracks requires special handling because they contain callback function to retrieve Youtube url.

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |
`tracks` | Array\<[Track](../interfaces/_types_general_.track.md)> |

**Returns:** Promise\<void>

___

### saveValue

▸ **saveValue**(`table`: Database.Table, `key`: string, `value`: string): Promise\<void>

*Defined in [util/cache.ts:39](https://github.com/ipmanlk/rem-track-hunter/blob/1b078d0/lib/util/cache.ts#L39)*

* This is a general purpose function. Use with caution.
! Do not use for spotify tracks.

#### Parameters:

Name | Type |
------ | ------ |
`table` | Database.Table |
`key` | string |
`value` | string |

**Returns:** Promise\<void>
