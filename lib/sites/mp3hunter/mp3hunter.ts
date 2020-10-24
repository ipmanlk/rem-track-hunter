import fetch from "node-fetch";
import { Mp3Hunter } from "../../types";
import { General } from "../../types";

export async function getTracks(
	keyword: string
): Promise<Array<General.Track>> {
	if (!keyword || keyword.length < 4) {
		throw "Please provide a valid keyword!";
	}

	// find given anime on mal
	let response: Mp3Hunter.Mp3HunterResponse | false = false;

	const retries = 5;
	let currentTry = 0;

	while (!response && currentTry !== retries) {
		response = await request(
			`https://ytww.xyz/search?q=${keyword}&page=0`
		).catch((e) => {
			console.log(e);
		});
		currentTry++;
	}

	if (!response || response.data.length == 0) {
		throw "No mp3 found for the given keyword!.";
	}

	// extrat track info
	const tracks: Array<General.Track> = [];

	response.data.every((mp3Track, index) => {
		tracks.push({
			type: "mp3hunter",
			name: mp3Track.title,
			uri: mp3Track.stream,
			artist: mp3Track.artist,
		});
		return index !== 4 ? true : false;
	});

	if (tracks.length == 0) throw `No tracks found for ${keyword}`;

	return tracks;
}

/**
 * @internal
 */
const request = async (url: string) => {
	return await (
		await fetch(encodeURI(url), {
			timeout: 10000,
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
			},
		}).catch()
	).json();
};
