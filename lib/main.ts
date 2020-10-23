import * as Spotify from "./sites/spotify";
import * as Youtube from "./sites/youtube";
import * as Themesmoe from "./sites/themesmoe";
import { getUrlType } from "./general/common";
import { General } from "./types";
import { urlType } from "./types/general";

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
	if (urlType == "themes.moe") {
		return Themesmoe.getTracks(keywordOrUrl);
	}

	// if urlType is not matched
	throw "Please provide a valid type!.";
}

export { Spotify, Youtube, getTracks };
