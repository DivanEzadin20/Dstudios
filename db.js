// MySQL database connection helper
// Creates and returns a singleton connection pool
require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

async function getConnection() {
	if (!pool) {
		pool = mysql.createPool({
			host: process.env.DB_HOST || 'localhost',
			port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
			user: process.env.DB_USER || 'root',
			password: process.env.DB_PASSWORD || '',
			database: process.env.DB_NAME || 'dstudios_db',
			waitForConnections: true,
			connectionLimit: 10,
			namedPlaceholders: true,
			multipleStatements: true
		});
	}
	return pool;
}

module.exports = { getConnection };
