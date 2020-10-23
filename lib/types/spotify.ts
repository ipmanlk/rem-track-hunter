import * as General from "./general";

export interface Genre {
	name?: string;
}

export interface Album {
	id?: string;
	name: string;
	artists?: Array<Artist>;
	genres?: Array<Genre>;
	label?: string;
	release_date?: Date;
	total_tracks?: number;
	tracks?: Array<Track>;
	uri?: string;
}

export interface Artist {
	id?: string;
	name: string;
	popularity?: number;
	uri: string;
	tracks: Array<Track>;
	description?: string | null;
}

export interface Track {
	id?: string;
	album?: Album;
	name: string;
	preview_url?: string;
	duration: number;
	explicit?: boolean;
	uri?: string;
	artists?: Array<Artist>;
	track?: boolean;
}

export interface User {
	id?: string;
	name: string;
	uri: string;
}

export interface Playlist {
	uri: string;
	name: string;
	tracks: Array<Track>;
	followers: number;
	owner: User;
	description?: string;
}

export interface Info {
	type: "album" | "artist" | "episode" | "playlist" | "track" | "show";
	track?: Track;
	artist?: Artist;
	album?: Album;
	playlist?: Playlist;
}
