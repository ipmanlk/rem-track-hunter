/* eslint-disable */
"use strict";

// settings for jest
jest.setTimeout(30000); // 30s

const { getTracks } = require("../dist/");

describe("URLs of different types", () => {
	test("youtube url without options", async () => {
		const tracks = await getTracks("https://youtu.be/H_RnyQdzOAI");
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks[0].name).not.toBe(undefined);
	});

	test("youtube url with options", async () => {
		const tracks = await getTracks("https://youtu.be/H_RnyQdzOAI", {
			type: "youtube",
		});
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks[0].name).not.toBe(undefined);
	});

	test("spotify url without options", async () => {
		const tracks = await getTracks(
			"https://open.spotify.com/track/6habFhsOp2NvshLv26DqMb?si=FkyYtDchRW-L8L2BlCweRw"
		);
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks[0].name).not.toBe(undefined);
	});

	test("spotify url with options", async () => {
		const tracks = await getTracks(
			"https://open.spotify.com/track/6habFhsOp2NvshLv26DqMb?si=FkyYtDchRW-L8L2BlCweRw",
			{ type: "spotify" }
		);
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks[0].name).not.toBe(undefined);
	});
});
