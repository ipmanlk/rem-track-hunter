import * as Spotify from "./sites/spotify";
import * as Youtube from "./sites/youtube";
import * as Themesmoe from "./sites/themesmoe";
import * as Mp3Hunter from "./sites/mp3hunter";
import { getUrlType } from "./general/common";
import { General } from "./types";
import { urlType } from "./types/general";
import * as Cache from "./util/cache";

// init cache
Cache.initializeDatabase();

async function getTracks(
	keywordOrUrl: string,
	options?: General.TrackHunterOptions
): Promise<Array<General.Track>> {
	// find given url type
	let urlType: urlType;

	// when options are not provided, try to guess type or use youtube
	if (!options || !options.type) {
		urlType = getUrlType(keywordOrUrl) || "youtube";
	} else {
		urlType = options.type;
	}

	if (urlType == "youtube") {
		try {
			const cachedTracks = await Cache.getValue("youtube", keywordOrUrl);
			return JSON.parse(cachedTracks);
		} catch (e) {
			const tracks = await Youtube.getTracks(keywordOrUrl);
			Cache.saveValue("youtube", keywordOrUrl, JSON.stringify(tracks)).catch(
				(e) => {
					console.log(e);
				}
			);
			return tracks;
		}
	}

	if (urlType == "spotify") {
		try {
			const cachedTracks = await Cache.getSpotifyValue(keywordOrUrl);
			return cachedTracks;
		} catch (e) {
			const tracks = await Spotify.getTracks(keywordOrUrl);
			Cache.saveValue("spotify", keywordOrUrl, JSON.stringify(tracks)).catch(
				(e) => {
					console.log(e);
				}
			);
			return tracks;
		}
	}

	if (urlType == "themesmoe") {
		try {
			const cachedTracks = await Cache.getValue("themesmoe", keywordOrUrl);
			return JSON.parse(cachedTracks);
		} catch (e) {
			const tracks = await Themesmoe.getTracks(keywordOrUrl);
			Cache.saveValue("themesmoe", keywordOrUrl, JSON.stringify(tracks)).catch(
				(e) => {
					console.log(e);
				}
			);
			return tracks;
		}
	}

	// * Won't setup caching for now since this site is not reliable
	if (urlType == "mp3hunter") {
		const tracks = await Mp3Hunter.getTracks(keywordOrUrl);
		return tracks;
	}

	// if urlType is not matched
	throw "Please provide a valid type!.";
}

export { Spotify, Youtube, Mp3Hunter, getTracks };
