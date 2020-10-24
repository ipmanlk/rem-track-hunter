import fetch from "node-fetch";
import { Anime } from "../../types";
import { General } from "../../types";

export async function getTracks(
	animeName: string
): Promise<Array<General.Track>> {
	if (!animeName || animeName.length < 4) {
		throw "Please provide a valid anime name!";
	}

	// find given anime on mal
	const malResponse: Anime.MalResponse = await request(
		`https://api.jikan.moe/v3/search/anime?q=${animeName}&limit=1`
	).catch((e) => {
		console.log(e);
		throw "Unable to contact the jikan api!.";
	});

	if (!malResponse.results || malResponse.results.length == 0) {
		throw "No anime found under the given name!.";
	}

	// extract mal id from mal url
	const malId = malResponse.results[0].url.split("/").reverse()[1];

	// get track info
	const response = await request(
		`https://themes.moe/api/themes/${malId}`
	).catch((e) => {
		console.log(e);
		throw "Unable to contact jikan api!.";
	});

	const themesMoeResponse = response[0] as Anime.ThemesMoeResponse;

	// extrat track info
	const tracks = themesMoeResponse.themes.map((theme) => {
		return {
			show: themesMoeResponse.name,
			type: "themes.moe",
			name: theme.themeName,
			uri: theme.mirror.mirrorURL,
		} as General.Track;
	});

	if (tracks.length == 0) throw `No tracks found for ${animeName}`;

	return tracks;
}

/**
 * @internal
 */
const request = async (url: string) => {
	return await (await fetch(encodeURI(url), { timeout: 10000 }).catch()).json();
};
