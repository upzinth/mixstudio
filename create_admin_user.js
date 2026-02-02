
import axios from 'axios';
import pg from 'pg';
const { Pool } = pg;

const API_URL = 'http://localhost:3000/api';
const ADMIN_EMAIL = 'admin@mixstudio.com';
const ADMIN_PASS = 'admin1234';
const ADMIN_NAME = 'Super Admin';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mixstudio',
    password: 'password',
    port: 5433,
});

const createAdmin = async () => {
    console.log(`\n👑 Creating Admin User: ${ADMIN_EMAIL}...`);

    try {
        // 1. Try to Register
        try {
            await axios.post(`${API_URL}/auth/register`, {
                email: ADMIN_EMAIL,
                password: ADMIN_PASS,
                fullName: ADMIN_NAME,
                avatarUrl: ''
            });
            console.log("   ✅ Account created successfully.");
        } catch (err) {
            if (err.response?.status === 400 && err.response?.data?.message === 'User already exists') {
                console.log("   ℹ️ Account already exists. Proceeding to promotion...");
            } else {
                throw err;
            }
        }

        // 2. Promote to Admin via Database
        console.log("   ⚡ Promoting to Admin...");
        const res = await pool.query(
            "UPDATE users SET is_admin = TRUE WHERE email = $1 RETURNING id",
            [ADMIN_EMAIL]
        );

        if (res.rowCount > 0) {
            console.log(`   ✅ Success! User ${ADMIN_EMAIL} is now an ADMIN.`);
            console.log(`   🔑 Login with:`);
            console.log(`      Email: ${ADMIN_EMAIL}`);
            console.log(`      Pass:  ${ADMIN_PASS}`);
        } else {
            console.error("   ❌ Failed to find user in database to promote.");
        }

    } catch (err) {
        console.error("   ❌ Error:", err.message);
        if (err.response) console.error("      API Response:", err.response.data);
    } finally {
        pool.end();
    }
};

createAdmin();
