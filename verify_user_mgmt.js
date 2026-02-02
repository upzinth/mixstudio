
import axios from 'axios';

// Config
const API_URL = 'http://localhost:3000/api';
const ADMIN_EMAIL = 'admin@mixstudio.com';
const ADMIN_PASS = 'admin1234';

// Test Data
const NEW_USER = {
    email: `testuser_${Date.now()}@example.com`,
    password: 'password123',
    fullName: 'Test Candidate',
    avatarUrl: ''
};

const runValidation = async () => {
    try {
        console.log("🚀 Starting User Management Verification...");

        // 1. Login as Admin
        console.log("   🔑 Logging in as Admin...");
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: ADMIN_EMAIL,
            password: ADMIN_PASS
        });
        const token = loginRes.data.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        console.log("      Success.");

        // 2. Register a temporary user to promote
        console.log("   👤 Registering new candidate user...");
        const regRes = await axios.post(`${API_URL}/auth/register`, NEW_USER);
        const candidateId = regRes.data.user.id;
        console.log(`      Created user ID: ${candidateId}`);

        // 3. List Users (Should see new user)
        console.log("   📋 Fetching User List...");
        const listRes = await axios.get(`${API_URL}/admin/users`, config);
        const found = listRes.data.find(u => u.id === candidateId);
        if (found) {
            console.log("      ✅ New user found in Admin list.");
        } else {
            throw new Error("New user not found in admin list!");
        }

        // 4. Promote User
        console.log("   ⚡ Promoting user to Admin...");
        const promoRes = await axios.put(`${API_URL}/admin/users/${candidateId}/role`, { is_admin: true }, config);
        if (promoRes.data.is_admin) {
            console.log("      ✅ User successfully promoted.");
        } else {
            throw new Error("Promotion failed!");
        }

        // 5. Demote User
        console.log("   ⬇️ Demoting user back to normal...");
        const demoRes = await axios.put(`${API_URL}/admin/users/${candidateId}/role`, { is_admin: false }, config);
        if (!demoRes.data.is_admin) {
            console.log("      ✅ User successfully demoted.");
        } else {
            throw new Error("Demotion failed!");
        }

        console.log("\n🎉 Verification Complete: User Management System is Functional.");

    } catch (err) {
        console.error("\n❌ Validation Failed:", err.message);
        if (err.response) console.error("   API Error:", err.response.data);
    }
};

runValidation();
