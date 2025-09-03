// Initialize database schema
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function init() {
	const host = process.env.DB_HOST || 'localhost';
	const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
	const user = process.env.DB_USER || 'root';
	const password = process.env.DB_PASSWORD || '';
	const database = process.env.DB_NAME || 'dstudios_db';

	try {
		const connection = await mysql.createConnection({ host, port, user, password });
		await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
		console.log(`Database ensured: ${database}`);
		await connection.end();

		const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
		const db = await mysql.createConnection({ host, port, user, password, database, multipleStatements: true });
		await db.query(schema);
		console.log('Schema applied successfully.');
		await db.end();
	} catch (err) {
		console.error('Error initializing database:', err);
		process.exit(1);
	}
}

init();
