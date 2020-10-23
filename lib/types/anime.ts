export interface MalResponse {
	request_hash: string;
	request_cached: boolean;
	request_cache_expiry: number;
	results: Result[];
	last_page: number;
}

export interface Result {
	mal_id: number;
	url: string;
	image_url: string;
	title: string;
	airing: boolean;
	synopsis: string;
	type: string;
	episodes: number;
	score: number;
	start_date: string;
	end_date: string;
	members: number;
	rated: string;
}

export interface ThemesMoeResponse {
	malID: number;
	name: string;
	year: number;
	season: string;
	themes: Theme[];
}

export interface Theme {
	themeType: string;
	themeName: string;
	mirror: Mirror;
}

export interface Mirror {
	mirrorURL: string;
	priority: number;
	notes: string;
}
