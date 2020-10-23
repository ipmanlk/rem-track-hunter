import fetch from "node-fetch";
import ytsr from "ytsr";
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

/**
 * @internal
 * @param  {string} keyword Name or title to search on Youtube.
 * @returns {Promise<string>} Will resolve the URL of first search result
 */
export async function getYoutubeUrl(keyword: string): Promise<string | false> {
	let youtubeLink: string | false = false;
	try {
		const searchResults = (await ytsr(keyword, {
			limit: 1,
			safeSearch: false,
		})) as any;
		youtubeLink = searchResults.items[0].link || false;
	} catch (e) {
		youtubeLink = await searchSearx(keyword);
	}
	return youtubeLink;
}

/**
 * This will use as a fallback when ytsr fails to retrieve a link
 * @internal
 */
async function searchSearx(keyword: string): Promise<string | false> {
	let link: string | boolean = false;

	const response = await (
		await fetch(
			`https://searx.lukesmith.xyz/?category_general=1&q=${keyword} youtube&pageno=1&time_range=None&language=en-US&format=json`,
			{
				timeout: 10000,
			}
		).catch()
	).json();

	if (
		response.results[0] &&
		response.results[0].url.indexOf("youtube") !== -1
	) {
		link = response.results[0].url;
	}

	return typeof link == "string" ? link : false;
}
