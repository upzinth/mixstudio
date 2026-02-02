import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'http://localhost:3000/api';
const LOG_FILE = path.join(__dirname, 'verification_log.txt');

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync(LOG_FILE, msg + '\n');
};

const run = async () => {
    fs.writeFileSync(LOG_FILE, 'Starting Verification...\n');

    try {
        // 1. Register/Login
        const email = `verify_${Date.now()}@example.com`;
        log(`1. Registering user: ${email}`);

        const regRes = await axios.post(`${API_URL}/auth/register`, {
            email,
            password: 'password123',
            fullName: `Verify User ${Date.now()}`,
            avatarUrl: ''
        });

        const token = regRes.data.token;
        log('   Token received.');

        // 2. Create dummy file
        const dummyPath = path.join(__dirname, 'test_audio_node.wav');
        fs.writeFileSync(dummyPath, 'DUMMY AUDIO CONTENT');

        // 3. Upload
        log('2. Uploading file...');
        const form = new FormData();
        form.append('file', fs.createReadStream(dummyPath));
        form.append('title', 'Node Verification Project');
        form.append('bpm', '128');
        form.append('key', 'F min');

        const uploadRes = await axios.post(`${API_URL}/projects/upload`, form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${token}`
            }
        });

        log(`   Upload Success! Project ID: ${uploadRes.data.id}`);
        log(`   File Path: ${uploadRes.data.files_meta.path}`);

        // 4. Verify File System
        if (fs.existsSync(uploadRes.data.files_meta.path)) {
            log('3. File System Check: ✅ File exists on server.');
        } else {
            log('3. File System Check: ❌ File NOT found.');
        }

    } catch (err) {
        log('❌ Error: ' + (err.response?.data?.message || err.message));
        if (err.response) log(JSON.stringify(err.response.data));
    }
};

run();
