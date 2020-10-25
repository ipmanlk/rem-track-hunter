import ytdl from "discord-ytdl-core";
import ytsr from "ytsr";
import cheerio from "cheerio";
import fetch from "node-fetch";
import ytpl from "ytpl";
import { General } from "../../types";
import * as Cache from "../../util/cache";
import { stringify as stringifyQuery } from "querystring";

export async function getTracks(
	keywordOrUrl: string
): Promise<Array<General.Track>> {
	let youtubeLink: string | false;

	// check if this is a youtube url or not
	const youtubeUrlRegex = new RegExp(
		"^(https?://)?(www.youtube.com|youtu.?be)/.+$"
	);

	if (!youtubeUrlRegex.test(keywordOrUrl)) {
		youtubeLink = await getYoutubeUrl(keywordOrUrl);
	} else {
		youtubeLink = keywordOrUrl;
	}

	// when youtube link is false
	if (!youtubeLink) throw "Sorry!. I couldn't find a track for that keyword!.";

	// check if this is a playlist
	if (youtubeLink.indexOf("list=") > -1) {
		const listId = youtubeLink.split("list=")[1];

		const playlist = await ytpl(listId).catch(() => {
			throw "Sorry!. I couldn't load that playlist!.";
		});

		const tracks = playlist.items
			.filter((t) => t.title !== "[Private video]")
			.map((t) => {
				return {
					name: t.title,
					uri: t.url,
					type: "youtube",
					duration: getSecondsFromYtLabel(t.duration || ""),
				} as General.Track;
			});

		return tracks;
	}

	// for a single track
	const trackInfo = await ytdl.getInfo(youtubeLink).catch(() => {
		throw "Sorry!. I couldn't find info for that track!.";
	});

	// ignore unsupported tracks
	if (trackInfo.videoDetails.isPrivate || !trackInfo.videoDetails.isCrawlable) {
		throw "Sorry!. I couldn't play that track!.";
	}

	const track: General.Track = {
		name: trackInfo.videoDetails.title,
		type: "youtube",
		uri: youtubeLink,
		duration: parseInt(trackInfo.videoDetails.lengthSeconds) || 0,
	};

	return [track];
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
		await fetch(
			"https://startpage.com/sp/search?" +
				stringifyQuery({ query: `${keyword} youtube` }) +
				'"',
			{
				timeout: 10000,
			}
		).catch()
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

/**
 * This will parse youtube time label (HH:mm:ss) and return seconds or false if parse failed
 * @internal
 */
function getSecondsFromYtLabel(label: string): number | false {
	let seconds = 0;
	const parts = label.split(":");
	if (parts.length == 3) {
		// hours
		seconds += parseInt(parts.shift() || "0") * 3600;
	}
	if (parts.length == 3 || 2) {
		// mins
		seconds += parseInt(parts.shift() || "0") * 60;
		// seconds
		seconds += parseInt(parts.shift() || "0");
	}
	return seconds !== 0 ? seconds : false;
}
