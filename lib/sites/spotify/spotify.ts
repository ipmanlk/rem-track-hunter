import * as Cache from "../../util/cache";
import { getInfo } from "./spotifyParser";
import { getYoutubeUrl } from "../../sites/youtube";
import { General } from "../../types";

export const getTracks = async (
	spotifyUrl: string
): Promise<Array<General.Track>> => {
	if (spotifyUrl.trim() == "") {
		throw "Please provide a valid Spotify uri!.";
	}

	// try cache
	try {
		const cachedTracks = await Cache.getSpotifyTracks(spotifyUrl);
		return cachedTracks;
	} catch {}

	const data = await getInfo(spotifyUrl);

	if (!data || !data.type) {
		throw "Unable to retrieve spotify tracks!.";
	}

	let tracks: Array<General.Track> | false = false;
	const dataType = data.type;

	switch (dataType) {
		case "track":
			if (data.track) {
				const artist = data.track.artists
					? data.track.artists.map((artist) => artist.name).join(", ")
					: "";
				const ytSearchString = `${data.track.name} ${artist}`;
				tracks = [
					{
						name: data.track.name,
						// duration: data.track.duration,
						uri: data.track.uri ? data.track.uri : "",
						getYtUrl: function () {
							return getYoutubeUrl(ytSearchString);
						},
						type: "spotify",
						artist: artist,
					},
				];
			}
			break;
		case "artist":
			if (data.artist) {
				tracks = data.artist.tracks.map((track) => {
					const artist = track.artists
						? track.artists.map((a) => a.name).join(", ")
						: "";
					const ytSearchString = `${track.name} ${artist}`;
					return {
						name: track.name,
						// duration: track.duration,
						uri: track.uri ? track.uri : "",
						getYtUrl: function () {
							return getYoutubeUrl(ytSearchString);
						},
						type: "spotify",
						artist: artist,
					};
				});
			}
			break;
		case "album":
			if (data.album && data.album.tracks) {
				tracks = data.album.tracks.map((track) => {
					const artist = track.artists
						? track.artists.map((a) => a.name).join(", ")
						: "";
					const ytSearchString = `${track.name} ${artist}`;
					return {
						name: track.name,
						// duration: track.duration,
						uri: track.uri ? track.uri : "",
						getYtUrl: function () {
							return getYoutubeUrl(ytSearchString);
						},
						type: "spotify",
						artist: artist,
					};
				});
			}
			break;
		case "playlist":
			if (data.playlist && data.playlist.tracks) {
				tracks = data.playlist.tracks.map((track) => {
					const artist = track.artists
						? track.artists.map((a) => a.name).join(", ")
						: "";
					const ytSearchString = `${track.name} ${artist}`;
					return {
						name: track.name,
						// duration: track.duration,
						uri: track.uri ? track.uri : "",
						getYtUrl: function () {
							return getYoutubeUrl(ytSearchString);
						},
						type: "spotify",
						artist: artist,
					};
				});
			}
			break;
	}

	if (!tracks) {
		throw "Unable to find any tracks!";
	}

	// save in cache
	Cache.saveSpotifyTracks(spotifyUrl, tracks).catch(() => {});

	return tracks;
};
