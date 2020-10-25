import { existsSync, mkdirSync } from "fs";
import { sqlite3 } from "sqlite3";
import { getYoutubeUrl } from "../sites/youtube";
import { Database, General } from "../types";

const sqlite3 = require("sqlite3").verbose();

const cacheDir = `${process.cwd()}/cache`;
const dbPath = `${cacheDir}/cache.db`;
/**
 * * This will create a database in process.cwd()/cache directory, if it doesn't exist.
 * @internal
 */
export function initializeDatabase(): void {
	if (!existsSync(cacheDir)) mkdirSync(cacheDir);

	if (!existsSync(dbPath)) {
		const DB = new sqlite3.Database(
			dbPath,
			sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
			(error: Database.DBError) => {
				if (error !== null)
					throw Error(`Unable to initialize the database!: ${error}`);
			}
		);
		DB.run(
			"CREATE TABLE youtube_url(key TEXT PRIMARY KEY, value TEXT NOT NULL)"
		);
		DB.run("CREATE TABLE youtube(key TEXT PRIMARY KEY, value TEXT NOT NULL)");
		DB.run("CREATE TABLE spotify(key TEXT PRIMARY KEY, value TEXT NOT NULL)");
		DB.run("CREATE TABLE themesmoe(key TEXT PRIMARY KEY, value TEXT NOT NULL)");
		DB.close();
	}
}

/**
 * * This is a general purpose function. Use with caution.
 * ! Do not use for spotify tracks.
 * @internal
 */
export function saveValue(
	table: Database.Table,
	key: string,
	value: string
): Promise<void> {
	return new Promise((resolve, reject) => {
		if (process.env.SKIP_CACHE) reject("SKIP_CACHE");
		const DB = getConnection();
		DB.run(
			`INSERT INTO ${table} VALUES(?,?)`,
			[key, value],
			(error: Database.DBError) => {
				DB.close();
				if (error !== null) reject(error);
				resolve();
			}
		);
	});
}

/**
 * * This is a general purpose function. Use with caution.
 * ! Do not use for spotify tracks.
 * @internal
 */
export function getValue(table: Database.Table, key: string): Promise<string> {
	return new Promise((resolve, reject) => {
		// reject when testing
		if (process.env.SKIP_CACHE) reject("SKIP_CACHE");
		const DB = getConnection();
		DB.get(
			`SELECT value FROM ${table} WHERE key = ?`,
			[key],
			(error: Database.DBError, row: Database.Row) => {
				DB.close();
				if (error) {
					reject(error);
				} else if (!row || !row.value) {
					reject("No record");
				} else {
					resolve(row.value);
				}
			}
		);
	});
}

/**
 * * This is a general purpose function for saving an array of tracks.
 * ! Do not use for spotify tracks.
 * @internal
 */
export function saveTracks(
	table: Database.Table,
	key: string,
	value: Array<General.Track>
): Promise<void> {
	return new Promise((resolve, reject) => {
		if (process.env.SKIP_CACHE) reject("SKIP_CACHE");
		const DB = getConnection();
		DB.run(
			`INSERT INTO ${table} VALUES(?,?)`,
			[key, JSON.stringify(value)],
			(error: Database.DBError) => {
				DB.close();
				if (error !== null) reject(error);
				resolve();
			}
		);
	});
}

/**
 * * This is a general purpose function for retrieving an array of tracks.
 * ! Do not use for spotify tracks.
 * @internal
 */
export function getTracks(
	table: Database.Table,
	key: string
): Promise<Array<General.Track>> {
	return new Promise((resolve, reject) => {
		// reject when testing
		if (process.env.SKIP_CACHE) reject("SKIP_CACHE");
		const DB = getConnection();
		DB.get(
			`SELECT value FROM ${table} WHERE key = ?`,
			[key],
			(error: Database.DBError, row: Database.Row) => {
				DB.close();
				if (error) {
					reject(error);
				} else if (!row || !row.value) {
					reject("No record");
				} else {
					resolve(JSON.parse(row.value));
				}
			}
		);
	});
}

/**
 * * Spotify tracks requires special handling because they contain callback function to retrieve Youtube url.
 * @internal
 */
export function saveSpotifyTracks(key: string, tracks: Array<General.Track>) {
	const cleanedTracks = tracks.map((track) => {
		return {
			name: track.name,
			duration: track.duration,
			uri: track.uri,
			artist: track.artist,
			type: track.type,
		};
	});

	return saveTracks("spotify", key, cleanedTracks);
}

/**
 * * Spotify tracks requires special handling because they contain callback function to retrieve Youtube url.
 * @internal
 */
export async function getSpotifyTracks(
	key: string
): Promise<Array<General.Track>> {
	if (process.env.SKIP_CACHE) throw "SKIP_CACHE";
	const value = await getTracks("spotify", key);
	const tracks: Array<General.Track> = value.map((track: General.Track) => {
		return {
			name: track.name,
			duration: track.duration,
			uri: track.uri,
			artist: track.artist,
			type: track.type,
			getYtUrl: function () {
				return getYoutubeUrl(`${track.name} ${track.artist}`);
			},
		} as General.Track;
	});

	return tracks;
}

/**
 * @internal
 */
function getConnection() {
	return new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (error: any) => {
		if (error !== null)
			throw Error(`Unable to connect to the database!: ${error}`);
	});
}
