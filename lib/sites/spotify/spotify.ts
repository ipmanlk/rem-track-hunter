import { getInfo } from "./spotifyParser";
import { getYoutubeUrl } from "../../sites/youtube";
import { General } from "../../types";

export const getTracks = async (
	spotifyUrl: string
): Promise<Array<General.Track>> => {
	const data = await getInfo(spotifyUrl).catch((error) => {
		throw error;
	});

	if (!data || !data.type) {
		throw "Unable to retrieve spotify tracks!.";
	}

	const dataType = data.type;

	switch (dataType) {
		case "track":
			if (data.track) {
				const artist = data.track.artists
					? data.track.artists.map((artist) => artist.name).join(", ")
					: "";
				const ytSearchString = `${data.track.name} ${artist}`;
				return [
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
		case "artist":
			if (data.artist) {
				return data.artist.tracks.map((track) => {
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
				return data.album.tracks.map((track) => {
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
				return data.playlist.tracks.map((track) => {
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

	throw "Unable to find any tracks!";
};
