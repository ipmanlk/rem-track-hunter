/* eslint-disable */
"use strict";

// settings for jest
jest.setTimeout(30000); // 30s

const { getTracks } = require("../dist/sites/youtube");

describe("Various Keywords", () => {
	test("Testing 'Numb linkin park' as keyword", async () => {
		const tracks = await getTracks("Numb linkin park");
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks[0].name).not.toBe(undefined);
	});

	test("Testing 'Naruto op 1' as keyword", async () => {
		const tracks = await getTracks("Naruto op 1");
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks[0].name).not.toBe(undefined);
	});

	test("Testing '&Z sawano hiroyuki' as keyword", async () => {
		const tracks = await getTracks("&Z sawano hiroyuki");
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks[0].name).not.toBe(undefined);
		expect(tracks[0].uri).toEqual(
			"https://www.youtube.com/watch?v=4gMXEd49rbg"
		);
	});
});

describe("Various Youtube URLs", () => {
	const shortSingleTrackUrl = "https://youtu.be/H_RnyQdzOAI";
	test("single video with short url", async () => {
		const tracks = await getTracks(shortSingleTrackUrl);
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks[0].name).not.toBe(undefined);
	});

	const longSingleTrackUrl = "https://www.youtube.com/watch?v=H_RnyQdzOAI";
	test("single video with long url", async () => {
		const tracks = await getTracks(longSingleTrackUrl);
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks[0].name).not.toBe(undefined);
	});

	const playlistUrl =
		"https://www.youtube.com/playlist?list=PLI26x8_Nsg0rH32Jr-Nmv4sELegb4r6o_";
	test("playlist url", async () => {
		const tracks = await getTracks(playlistUrl);
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks.length).toBeGreaterThan(1);
		expect(tracks[0].name).not.toBe(undefined);
	});
});
