// Simple migration runner
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { getConnection } = require('./db');

async function runMigrations() {
	const dir = path.join(__dirname, 'migrations');
	if (!fs.existsSync(dir)) {
		console.log('No migrations directory. Skipping.');
		return;
	}
	const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();
	if (files.length === 0) {
		console.log('No migration files.');
		return;
	}
	const pool = await getConnection();
	for (const file of files) {
		const sql = fs.readFileSync(path.join(dir, file), 'utf8');
		if (!sql.trim()) continue;
		console.log(`Applying migration: ${file}`);
		try {
			await pool.query(sql);
		} catch (err) {
			// Ignore duplicate column errors for idempotency
			if (err && err.code === 'ER_DUP_FIELDNAME') {
				console.log(`Skipping existing column (duplicate) in ${file}`);
			} else {
				throw err;
			}
		}
	}
	console.log('Migrations complete.');
}

runMigrations().catch(err => {
	console.error('Migration error:', err);
	process.exit(1);
});
