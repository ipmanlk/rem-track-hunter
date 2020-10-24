export interface Row {
	key: string;
	value: string;
}

export type DBError = null | Error;

export type Table = "youtube" | "youtube_url" | "themesmoe" | "spotify";
