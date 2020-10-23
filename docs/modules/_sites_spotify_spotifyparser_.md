**[rem-track-hunter](../README.md)**

> [Globals](../globals.md) / "sites/spotify/spotifyParser"

# Module: "sites/spotify/spotifyParser"

## Index

### Functions

* [getInfo](_sites_spotify_spotifyparser_.md#getinfo)
* [parseAlbum](_sites_spotify_spotifyparser_.md#parsealbum)
* [parseArtist](_sites_spotify_spotifyparser_.md#parseartist)
* [parsePlaylist](_sites_spotify_spotifyparser_.md#parseplaylist)
* [parseResponse](_sites_spotify_spotifyparser_.md#parseresponse)
* [parseTrack](_sites_spotify_spotifyparser_.md#parsetrack)

## Functions

### getInfo

▸ **getInfo**(`URI`: string): Promise\<[Info](../interfaces/_types_spotify_.info.md) \| undefined>

*Defined in sites/spotify/spotifyParser.ts:45*

**`internal`** 

#### Parameters:

Name | Type |
------ | ------ |
`URI` | string |

**Returns:** Promise\<[Info](../interfaces/_types_spotify_.info.md) \| undefined>

___

### parseAlbum

▸ **parseAlbum**(`data`: any): [Info](../interfaces/_types_spotify_.info.md)

*Defined in sites/spotify/spotifyParser.ts:189*

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | any | Parsed JSON data from responseHTML. |

**Returns:** [Info](../interfaces/_types_spotify_.info.md)

- Data belong to a single album.

___

### parseArtist

▸ **parseArtist**(`data`: any): [Info](../interfaces/_types_spotify_.info.md)

*Defined in sites/spotify/spotifyParser.ts:158*

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | any | Parsed JSON data from responseHTML. |

**Returns:** [Info](../interfaces/_types_spotify_.info.md)

- Data belong to a single artist.

___

### parsePlaylist

▸ **parsePlaylist**(`data`: any): [Info](../interfaces/_types_spotify_.info.md)

*Defined in sites/spotify/spotifyParser.ts:238*

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | any | Parsed JSON data from responseHTML. |

**Returns:** [Info](../interfaces/_types_spotify_.info.md)

- Data belong to a single playlist.

___

### parseResponse

▸ **parseResponse**(`responseHTML`: string, `parsedURI`: ParsedSpotifyUri): [Info](../interfaces/_types_spotify_.info.md) \| undefined

*Defined in sites/spotify/spotifyParser.ts:85*

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`responseHTML` | string | HTML from the Spotify embed URL. |
`parsedURI` | ParsedSpotifyUri | Parsed Spotify URI.  |

**Returns:** [Info](../interfaces/_types_spotify_.info.md) \| undefined

___

### parseTrack

▸ **parseTrack**(`data`: any): [Info](../interfaces/_types_spotify_.info.md)

*Defined in sites/spotify/spotifyParser.ts:122*

**`internal`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | any | Parsed JSON data from responseHTML. |

**Returns:** [Info](../interfaces/_types_spotify_.info.md)

- Data belong to a single track.
