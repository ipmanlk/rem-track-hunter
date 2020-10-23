import ytdl from "discord-ytdl-core";
import ytpl from "ytpl";
// import * as cache from "../utils/cache";
import { General } from "../../types";
import { getYoutubeUrl } from "../../general/common";

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
					identifier: t.url,
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
		identifier: youtubeLink,
		duration: parseInt(trackInfo.videoDetails.lengthSeconds) || 0,
	};

	return [track];
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
