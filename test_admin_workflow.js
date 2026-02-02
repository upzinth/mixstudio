import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'http://localhost:3000/api';
const LOG_FILE = path.join(__dirname, 'admin_verification_log.txt');

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync(LOG_FILE, msg + '\n');
};

const run = async () => {
    fs.writeFileSync(LOG_FILE, 'Starting Admin Verification...\n');

    try {
        // 1. Login as Admin (using the verify user we promoted)
        // Need to find the email we created earlier.
        // For simplicity, we'll just register a NEW admin user for this test.

        const timestamp = Date.now();
        const adminEmail = `admin_${timestamp}@example.com`;
        const clientEmail = `client_${timestamp}@example.com`;

        log(`1. Creating Users...`);

        // Register Admin
        const adminReg = await axios.post(`${API_URL}/auth/register`, {
            email: adminEmail, password: 'password123', fullName: 'Admin User', avatarUrl: ''
        });
        const adminToken = adminReg.data.token;
        const adminId = adminReg.data.user.id;
        log(`   Admin Created: ${adminEmail}`);

        // Register Client
        const clientReg = await axios.post(`${API_URL}/auth/register`, {
            email: clientEmail, password: 'password123', fullName: 'Client User', avatarUrl: ''
        });
        const clientToken = clientReg.data.token;
        log(`   Client Created: ${clientEmail}`);

        // Promote Admin via "Backdoor" (We'll assume we used the SQL command earlier, 
        // but for this script to be self-contained, we might need a way to promote.
        // SINCE WE CAN'T run SQL from node without pg driver config, we will rely on
        // the fact that we ran the SQL command to promote existing verify users.
        // ACTUALLY, let's just use the `verify_...` user if we can find it, OR
        // we can try to hit the DB if we import 'pg'.

        // Let's assume the previous SQL command `UPDATE users SET is_admin = TRUE WHERE email LIKE 'verify_%'`
        // worked for the PREVIOUS user. Let's try to login as THAT user.
        // But we don't know the email.

        // ALTERNATIVE: Use the `pool` from `server/db.js`? No, we are outside the server.
        // We will skip SQL promotion here and assume manual intervention or previous step success.
        // Wait, I can run a system command using `child_process` in this script if needed, 
        // OR I can just run the SQL command via `run_command` tool before this script.

        // Let's assume we will promote `admin_...` user via SQL immediately after this script starts?
        // No, that's racy. 

        // Let's just use the `verify_upload_task.js` user if we knew it. 
        // Better: I will output the email to a file, read it, and promote it.
        // OR: I'll just run a SQL command to promote ALL users starting with `admin_` to true.
        // YES.

        log('   (Waiting for Admin Promotion Trigger...)');
        // We will pause here for 5 seconds to allow me to run the SQL command in parallel? 
        // No, I can't do parallel.

        // OK, I will rely on a "magic" SQL command I'll run BEFORE this script 
        // that says "UPDATE users SET is_admin=TRUE WHERE email LIKE 'admin_%'".
        // I will run that command AFTER creating the user.

    } catch (err) {
        log('❌ Error: ' + (err.response?.data?.message || err.message));
    }
};

// SIMPLIFIED APPROACH: separate creation and testing.
// 1. Create Admin & Client via script.
// 2. Run SQL to promote Admin.
// 3. Run script Part 2 to verify.

// Let's make this script to encompass EVERYTHING, but I need to use `pg` to execute SQL 
// because I can't switch to terminal tool in the middle of this script execution easily
// without breaking the flow or making it complex.
// ... Actually I have `pg` installed in `server`. I can import it!

import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mixstudio',
    password: 'password', // Default?
    port: 5433,
});

const runComplete = async () => {
    fs.writeFileSync(LOG_FILE, 'Starting Full Verification...\n');

    try {
        const timestamp = Date.now();
        const adminEmail = `admin_${timestamp}@example.com`;
        const clientEmail = `client_${timestamp}@example.com`;

        // 1. Register Users
        const adminReg = await axios.post(`${API_URL}/auth/register`, {
            email: adminEmail, password: 'password123', fullName: `Admin ${timestamp}`, avatarUrl: ''
        });
        const adminToken = adminReg.data.token;

        const clientReg = await axios.post(`${API_URL}/auth/register`, {
            email: clientEmail, password: 'password123', fullName: `Client ${timestamp}`, avatarUrl: ''
        });
        const clientToken = clientReg.data.token;
        const clientId = clientReg.data.user.id;

        log(`1. Users Created.\n   Admin: ${adminEmail}\n   Client: ${clientEmail}`);

        // 2. Promote Admin (Direct DB)
        await pool.query("UPDATE users SET is_admin = TRUE WHERE email = $1", [adminEmail]);
        log(`2. Admin Promoted via DB.`);

        // 3. Client Uploads Project
        log(`3. Client uploading project...`);
        // (Mocking the upload request without file for speed if possible? No, api requires file. 
        // We'll skip file upload and just INSERT raw valid project for speed? 
        // No, let's use the API to be integration test.)

        // Create dummy file
        const dummyPath = path.join(__dirname, 'test.wav');
        fs.writeFileSync(dummyPath, 'audio');

        // Use FormData logic (needs importing FormData or node-fetch compatible)
        // We need 'form-data' package
        const FormData = (await import('form-data')).default;
        const form = new FormData();
        form.append('file', fs.createReadStream(dummyPath));
        form.append('title', 'Workflow Test Project');

        const uploadRes = await axios.post(`${API_URL}/projects/upload`, form, {
            headers: { ...form.getHeaders(), 'Authorization': `Bearer ${clientToken}` }
        });
        const projectId = uploadRes.data.id;
        log(`   Project Uploaded. ID: ${projectId}`);

        // 4. Admin Checks Project List
        log(`4. Admin fetching projects...`);
        const adminProjects = await axios.get(`${API_URL}/admin/projects`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });

        const found = adminProjects.data.find(p => p.id === projectId);
        if (found) log(`   ✅ Admin sees the project.`);
        else log(`   ❌ Admin DOES NOT see the project.`);

        // 5. Admin Updates Status
        log(`5. Admin updating status to 'review'...`);
        await axios.put(`${API_URL}/admin/projects/${projectId}/status`,
            { status: 'review' },
            { headers: { 'Authorization': `Bearer ${adminToken}` } }
        );
        log(`   Status updated.`);

        // 6. Client Checks Status
        log(`6. Client checking status...`);
        const clientProjects = await axios.get(`${API_URL}/projects`, {
            headers: { 'Authorization': `Bearer ${clientToken}` }
        });
        const clientProject = clientProjects.data.find(p => p.id === projectId);
        if (clientProject.status === 'review') {
            log(`   ✅ Client sees status 'review'. SUCCESS!`);
        } else {
            log(`   ❌ Client sees status '${clientProject.status}'. FAILED.`);
        }

        pool.end();

    } catch (err) {
        log('❌ Error: ' + err.message);
        if (err.response) log('   ' + JSON.stringify(err.response.data));
        pool.end();
    }
};

runComplete();
