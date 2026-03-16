const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'todos',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to database', err.message);
    } else {
        console.log('Connected to PostgreSQL');
        release();
    }
});

module.exports = pool;