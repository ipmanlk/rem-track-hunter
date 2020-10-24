export interface Mp3HunterResponse {
	status: string;
	data: data[];
}

export interface data {
	source_id: string;
	artist: string;
	title: string;
	duration: number;
	date: number;
	genre_id: number;
	download: string;
	stream: string;
	cover: string;
}
