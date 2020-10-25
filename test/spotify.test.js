/* eslint-disable */

// These tests won't work in Spotify unsupported countries
"use strict";

// settings for jest
jest.setTimeout(30000); // 30s

const { getTracks } = require("../dist/sites/spotify");

describe("Various Spotify URIs", () => {
	const trackUrl =
		"https://open.spotify.com/track/6habFhsOp2NvshLv26DqMb?si=FkyYtDchRW-L8L2BlCweRw";
	test("Track", async () => {
		const tracks = await getTracks(trackUrl);
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks.length).not.toBe(0);
		expect(tracks[0].name).not.toBe(undefined);
		expect(tracks[0].artist).not.toBe(undefined);
		const youtubeUrl = await tracks[0].getYtUrl();
		expect(typeof youtubeUrl).toBe("string");
	});

	const artistUrl =
		"https://open.spotify.com/artist/6S2OmqARrzebs0tKUEyXyp?si=Z9bKuJqOTUijM-6DCOeUzw";
	test("Artist", async () => {
		const tracks = await getTracks(artistUrl);
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks.length).not.toBe(0);
		expect(tracks[0].name).not.toBe(undefined);
		expect(tracks[0].artist).not.toBe(undefined);
		const youtubeUrl = await tracks[0].getYtUrl();
		expect(typeof youtubeUrl).toBe("string");
	});

	const albumUrl =
		"https://open.spotify.com/album/6Kssm2LosQ0WyLukFZkEG5?si=Beef3bOiQE2NWsduUj5zEw";
	test("Album", async () => async () => {
		const tracks = await getTracks(albumUrl);
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks.length).not.toBe(0);
		expect(tracks[0].name).not.toBe(undefined);
		expect(tracks[0].artist).not.toBe(undefined);
		const youtubeUrl = await tracks[0].getYtUrl();
		expect(typeof youtubeUrl).toBe("string");
	});

	const playlistUrl =
		"https://open.spotify.com/playlist/67T8G3AMlkFcQ8l1XKAfXt?si=bKLImB7pTKiIwO33wGKk8A";
	test("Playlist", async () => {
		const tracks = await getTracks(playlistUrl);
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks.length).not.toBe(0);
		expect(tracks[0].name).not.toBe(undefined);
		expect(tracks[0].artist).not.toBe(undefined);
		const youtubeUrl = await tracks[0].getYtUrl();
		expect(typeof youtubeUrl).toBe("string");
	});
});
