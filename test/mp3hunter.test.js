/* eslint-disable */
"use strict";

// settings for jest
jest.setTimeout(30000); // 30s

const { getTracks } = require("../dist/");

describe("Mp3 hunter track search for a given keyword", () => {
	test("Try 'Eminem not afraid' as keyword", async () => {
		const tracks = await getTracks("Eminem not afraid", {
			type: "mp3hunter",
		});
		expect(Array.isArray(tracks)).toBe(true);
		expect(tracks[0].name).not.toBe(undefined);
	});
});
