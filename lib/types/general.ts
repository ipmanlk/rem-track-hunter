export type urlType = "spotify" | "themesmoe" | "youtube" | "mp3hunter";
export type trackType = urlType;

export interface Track {
	name: string;
	type: trackType;
	uri: string;
	getYtUrl?(keywordOrUrl: string): Promise<string | false>;
	seekedTime?: number;
	duration?: number;
	artist?: string;
	show?: string;
}

export interface TrackHunterOptions {
	type: trackType | false;
}
