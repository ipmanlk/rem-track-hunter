/* eslint-disable */
"use strict";

// settings for jest
jest.setTimeout(30000); // 30s

const { getTracks } = require("../dist/");

describe("Anime names for themesmoe", () => {
	test("Try 'Naruto' as anime name", async () => {
		const tracks = await getTracks("Naruto", {
			type: "themesmoe",
		});
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks[0].name).not.toBe(undefined);
	});
});
