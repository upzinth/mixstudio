
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';
const EMAIL = `verify_test_${Date.now()}@example.com`;
const PASS = 'password123';

const run = async () => {
    console.log("🚀 Starting Email Verification Flow Test...");

    try {
        // 1. Register (Should return success message, NOT token)
        console.log("   1. Registering new user...");
        const regRes = await axios.post(`${API_URL}/auth/register`, {
            email: EMAIL,
            password: PASS,
            fullName: 'Verify Test',
            avatarUrl: ''
        });

        if (regRes.data.token) throw new Error("Register returned token! Should be unverified.");
        console.log("      ✅ Registration successful (Unverified).");

        // 2. Try Login (Should Fail with 403)
        console.log("   2. Attempting Login (Expect Failure)...");
        try {
            await axios.post(`${API_URL}/auth/login`, { email: EMAIL, password: PASS });
            throw new Error("Login succeeded but should have FAILED!");
        } catch (err) {
            if (err.response?.status === 403) {
                console.log("      ✅ Login failed as expected (403 Forbidden).");
            } else {
                throw err;
            }
        }

        // 3. Get Verification Token (Hack: Read from DB directly since we can't scrape console logs easily here)
        // Note: In real E2E, we would read the email. Here we query DB.
        // We will just read the user from DB to get the token.
        // Wait, I can't require 'pg' here easily if dependencies are messed up, but let's try assuming internal tool usage or I'll just skip this part by assuming I need to manually verify? 
        // No, I can use the same technique as `create_admin_user.js` and use `pg`.

        const { Pool } = await import('pg');
        const pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'mixstudio',
            password: 'password',
            port: 5433,
        });

        console.log("   3. Fetching Token from DB...");
        const dbRes = await pool.query("SELECT verification_token FROM users WHERE email = $1", [EMAIL]);
        const token = dbRes.rows[0].verification_token;
        console.log(`      Token: ${token}`);

        // 4. Verify (Call GET endpoint)
        console.log("   4. Verifying Email...");
        await axios.get(`${API_URL}/auth/verify?token=${token}`, {
            maxRedirects: 0, // Don't follow redirect, just check status
            validateStatus: status => status >= 200 && status < 400
        });
        console.log("      ✅ Verification endpoint called.");

        // 5. Login Again (Should Success)
        console.log("   5. Attempting Login (Expect Success)...");
        const loginRes = await axios.post(`${API_URL}/auth/login`, { email: EMAIL, password: PASS });
        if (loginRes.data.token) {
            console.log("      ✅ Login successful!");
        } else {
            throw new Error("No token returned on successful login.");
        }

        pool.end();
        console.log("\n🎉 Email Verification Flow WORKS!");

    } catch (err) {
        console.error("\n❌ Test Failed:", err.message);
        if (err.response) console.error("   API Response:", err.response.data);
    }
};

run();
