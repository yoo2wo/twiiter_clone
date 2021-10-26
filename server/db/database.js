import mysql from 'mysql2';
import { config } from '../config.js';

//sql 에 접속
export const pool = mysql.createPool({
	host : config.db.host,
	user: config.db.user,
	database: config.db.database,
	password: config.db.password,
});

export const db = pool.promise();
