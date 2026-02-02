import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' }); // Try to load from root .env if running from server dir

const { Pool } = pg;

// Use explicit connection details if not in env, matching our Docker setup
const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'mixstudio',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: parseInt(process.env.POSTGRES_PORT || '5433'),
});

export default pool;
