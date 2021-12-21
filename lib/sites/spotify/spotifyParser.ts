import fetch from "node-fetch";
import cheerio from "cheerio";
import spotifyURI, { ParsedSpotifyUri } from "spotify-uri";
import { Spotify } from "../../types";

/**
 * @internal
 * @param {string} URI - Spotify URI in any format. Only URIs for tracks, artists, albums and playlists are supported.
 *```javascript
 * const { getInfo } = require("@ipmanlk/spotify-grab")
 *
 * const URI = "https://open.spotify.com/track/6habFhsOp2NvshLv26DqMb?si=FkyYtDchRW-L8L2BlCweRw"
 *
 * getInfo(URI).then(data => {
 * 		console.log(data);
 * }).catch(error => {
 * 		console.log(error);
 * });
 *
 *  //* Output of the above code will take following shape,
 * {
 *   "type": "track", //* Type of the input URI
 *   "track": {       //* Object with the name of above type (dynamic)
 *     "id": "6habFhsOp2NvshLv26DqMb",
 *     "name": "Despacito",
 *     "preview_url": "https://p.scdn.co/mp3-preview/ce2ad348fa47",
 *     "album": {
 *       "name": "VIDA"
 *     },
 *     "explicit": false,
 *     "artists": [
 *       {
 *         "id": "4V8Sr092TqfHkfAA5fXXqG",
 *         "name": "Luis Fonsi",
 *         "uri": "spotify:artist:4V8Sr092TqfHkfAA5fXXqG"
 *       }
 *     ]
 *   }
 * }
 *```
 */
/**
 * @internal
 */
export async function getInfo(URI: string): Promise<Spotify.Info | undefined> {
	// allowed url types
	const allowedTypes = ["track", "artist", "album", "playlist"];
	let parsedURI;

	// try to parse the given uri
	try {
		parsedURI = spotifyURI.parse(URI);
	} catch (e) {
		throw new Error("SPOTIFY_URI_PARSE_ERROR");
	}

	if (!parsedURI.type) throw new Error("SPOTIFY_URI_PARSE_ERROR");

	if (!allowedTypes.includes(parsedURI.type))
		throw new Error("SPOTIFY_UNSUPPORTED_URI_TYPE");

	// find the embed url
	const embedURL = spotifyURI.formatEmbedURL(parsedURI);

	// get spotify embed page
	const response = await fetch(encodeURI(embedURL), { timeout: 10000 }).catch(
		() => {
			throw new Error("SPOTIFY_REQUEST_FAILED");
		}
	);

	const responseHTML = await response.text();

	// get parsed object
	try {
		const spotifyInfo = parseResponse(responseHTML, parsedURI);
		return spotifyInfo;
	} catch (e) {
		new Error("SPOTIFY_HTML_PARSE_ERROR");
	}
}
/**
 * @internal
 * @param  {string} responseHTML - HTML from the Spotify embed URL.
 * @param  {ParsedSpotifyUri} parsedURI - Parsed Spotify URI.
 */
function parseResponse(
	responseHTML: string,
	parsedURI: ParsedSpotifyUri
): Spotify.Info | undefined {
	const $ = cheerio.load(responseHTML);

	// try to parse JSON inside resource element
	let data;
	try {
		data = JSON.parse(decodeURIComponent($("#resource").html() || ""));
	} catch (e) {
		new Error("SPOTIFY_HTML_PARSE_ERROR");
	}

	// check if parsed data is valid
	if (!data.type && !data.followers) {
		new Error("SPOTIFY_HTML_PARSE_ERROR");
	}

	const uriType = parsedURI.type;

	// parse track
	if (uriType == "track") {
		return parseTrack(data);
	} else if (uriType == "artist") {
		return parseArtist(data);
	} else if (uriType == "album") {
		return parseAlbum(data);
	} else {
		return parsePlaylist(data);
	}
}
/**
 * @internal
 * @param  {any} data - Parsed JSON data from responseHTML.
 * @returns {Spotify.Info} - Data belong to a single track.
 */
function parseTrack(data: any): Spotify.Info {
	const album = data.album
		? {
				name: data.album.name,
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
		: undefined;

	const spotifyInfo: Spotify.Info = {
		type: "track",
		track: {
			id: data.id,
			name: data.name,
			preview_url: data.preview_url,
			album: album,
			duration: data.duration_ms,
			explicit: data.explicit,
			artists: data.album.artists.map((a: Spotify.Artist) => {
				return {
					id: a.id,
					name: a.name,
					uri: a.uri,
				};
			}),
			uri: data.uri,
		},
	};

	return spotifyInfo;
}

/**
 * @internal
 * @param  {any} data - Parsed JSON data from responseHTML.
 * @returns {Spotify.Info} - Data belong to a single artist.
 */
function parseArtist(data: any): Spotify.Info {
	const tracks = data.tracks
		.map((t: Spotify.Track) => {
			if (t.track == false) return;
			return {
				name: t.name,
				uri: t.uri,
				artists: t.artists,
				album: t.album,
			};
		})
		.filter((t: Spotify.Track) => t);

	const spotifyInfo: Spotify.Info = {
		type: "artist",
		artist: {
			name: data.name,
			popularity: data.popularity,
			tracks: tracks,
			uri: data.uri,
		},
	};

	return spotifyInfo;
}

/**
 * @internal
 * @param  {any} data - Parsed JSON data from responseHTML.
 * @returns {Spotify.Info} - Data belong to a single album.
 */
function parseAlbum(data: any): Spotify.Info {
	const tracks = data.tracks.items
		.map((t: Spotify.Track) => {
			if (t.track == false) return;
			return {
				name: t.name,
				uri: t.uri,
				artists: t.artists
					? t.artists.map((a: Spotify.Artist) => {
							return {
								id: a.id,
								name: a.name,
								uri: a.uri,
							};
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  })
					: [],
			};
		})
		.filter((t: Spotify.Track) => t);

	const spotifyInfo: Spotify.Info = {
		type: "album",
		album: {
			uri: data.uri,
			name: data.name,
			artists: data.artists.map((a: Spotify.Artist) => {
				return {
					id: a.id,
					name: a.name,
					uri: a.uri,
				};
			}),
			genres: data.genres,
			label: data.label,
			release_date: new Date(data.release_date),
			total_tracks: data.total_tracks,
			tracks: tracks,
		},
	};

	return spotifyInfo;
}

/**
 * @internal
 * @param  {any} data - Parsed JSON data from responseHTML.
 * @returns {Spotify.Info} - Data belong to a single playlist.
 */
function parsePlaylist(data: any): Spotify.Info {
	const tracks = data.tracks.items
		.map((item: any) => {
			const track = item.track;
			if (track == false) return;
			return {
				name: track.name,
				uri: track.uri,
				artists: track.artists
					? track.artists.map((a: Spotify.Artist) => {
							return {
								id: a.id,
								name: a.name,
								uri: a.uri,
							};
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  })
					: [],
			};
		})
		.filter((t: Spotify.Track) => t);

	const spotifyInfo: Spotify.Info = {
		type: "playlist",
		playlist: {
			uri: data.uri,
			description: data.description,
			name: data.name,
			followers: data.followers.total,
			owner: {
				name: data.owner.display_name,
				uri: data.owner.uri,
			},
			tracks: tracks,
		},
	};

	return spotifyInfo;
}
