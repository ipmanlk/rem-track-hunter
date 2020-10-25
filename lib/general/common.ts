import fetch from "node-fetch";
import cheerio from "cheerio";
import ytsr from "ytsr";
import { General } from "../types";
import * as Cache from "../util/cache";

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

	// try cache
	const cachedLink = await Cache.getValue("youtube_url", keyword).catch((e) => {
		// console.log("Failed to read youtube_url table.");
	});

	if (cachedLink) return cachedLink;

	// try online
	try {
		const searchResults = (await ytsr(keyword, {
			limit: 1,
			safeSearch: false,
		})) as any;
		youtubeLink = searchResults.items[0].link || false;
	} catch (e) {
		youtubeLink = await searchStartpage(keyword);
	}

	// if it's not false, write to cache
	if (typeof youtubeLink == "string") {
		Cache.saveValue("youtube_url", keyword, youtubeLink).catch((e) => {
			// console.log("Failed to write to youtube_url table.");
		});
	}

	return youtubeLink;
}

/**
 * This will use as a fallback when ytsr fails to retrieve a link
 * @internal
 */
async function searchStartpage(keyword: string): Promise<string | false> {
	let link: string | boolean = false;

	const response = await (
		await fetch(encodeURI(`https://startpage.com/sp/search?query=${keyword}`), {
			timeout: 10000,
		}).catch()
	).text();

	// parse startpage html
	const $ = cheerio.load(response);

	const resultLink = $("body")
		.find(".w-gl__result .w-gl__result-second-line-container a")
		.first()
		.attr("href");

	if (resultLink && resultLink.indexOf("youtube") > -1) link = resultLink;

	return typeof link == "string" ? link : false;
}
