import { General } from "../types";

/**
 * @internal
 */
export function getUrlType(url: string): General.urlType | false {
	if (/^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/.test(url)) {
		return "spotify";
	}
	if (new RegExp("^(https?://)?(www.youtube.com|youtu.?be)/.+$").test(url)) {
		return "youtube";
	}

	return false;
}
