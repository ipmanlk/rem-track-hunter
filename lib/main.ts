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
		return Youtube.getTracks(keywordOrUrl);
	}

	if (urlType == "spotify") {
		return Spotify.getTracks(keywordOrUrl);
	}

	if (urlType == "themesmoe") {
		return Themesmoe.getTracks(keywordOrUrl);
	}

	// * Won't setup caching for now since this site is not reliable
	if (urlType == "mp3hunter") {
		return Mp3Hunter.getTracks(keywordOrUrl);
	}

	// if urlType is not matched
	throw "Please provide a valid type!.";
}

export { Spotify, Youtube, Mp3Hunter, getTracks };
