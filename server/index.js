import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './db.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key-change-this-in-production';

app.use(cors());
app.use(express.json());

// Middleware to verify Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const authenticateAdmin = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT is_admin FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length > 0 && result.rows[0].is_admin) {
            next();
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

// Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        // Truncate to 30 chars and remove special chars to be safe
        const safeName = name.slice(0, 30).replace(/[^a-zA-Z0-9à-úÀ-Ú\s._-]/g, '');
        cb(null, uniqueSuffix + '-' + safeName + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 * 1024 } // 2GB limit
});

// Email Transporter (Gmail)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: 'upz.in.th@gmail.com',
        pass: 'dcah mqde qpsv losz' // App Password
    }
});

// Register
// Register
app.post('/api/auth/register', async (req, res) => {
    const { email, password, fullName, avatarUrl } = req.body;

    try {
        // Check if user exists
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

        // Insert user (Unverified by default)
        const newUser = await pool.query(
            'INSERT INTO users (email, password_hash, full_name, avatar_url, is_verified, verification_token) VALUES ($1, $2, $3, $4, FALSE, $5) RETURNING id, email, full_name, avatar_url',
            [email, hash, fullName, avatarUrl, verificationToken]
        );

        const user = newUser.rows[0];

        // Send Verification Email
        const verificationLink = `http://localhost:3000/api/auth/verify?token=${verificationToken}`;

        await transporter.sendMail({
            from: '"MixStudio" <upz.in.th@gmail.com>',
            to: email,
            subject: 'Verify your email - MixStudio',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <h2 style="color: #d4af37; text-align: center;">Welcome to MixStudio!</h2>
                    <p style="color: #333; text-align: center;">Please verify your email address to complete your registration.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationLink}" style="background-color: #d4af37; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email Address</a>
                    </div>
                    <p style="color: #666; font-size: 12px; text-align: center;">If you didn't create an account, you can safely ignore this email.</p>
                </div>
            `
        });

        console.log(`\n📧 [EMAIL SENT] To: ${email} (Token: ${verificationToken})\n`);

        res.json({ message: 'Registration successful. Please check your email to verify your account.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify Email Endpoint
app.get('/api/auth/verify', async (req, res) => {
    const { token } = req.query;
    try {
        const result = await pool.query(
            "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = $1 RETURNING email",
            [token]
        );

        if (result.rows.length === 0) {
            return res.status(400).send('Invalid or expired verification token.');
        }

        // Redirect to login page with success param
        res.redirect('http://localhost:5173/login?verified=true');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // CHECK VERIFICATION
        if (!user.is_verified) {
            return res.status(403).json({ message: 'Email not verified. Please check your inbox.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

        // Don't send password hash back
        delete user.password_hash;
        res.json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Current User (Me) & Profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
    try {
        const userResult = await pool.query('SELECT id, email, full_name, avatar_url FROM users WHERE id = $1', [req.user.id]);
        const profileResult = await pool.query('SELECT * FROM profiles WHERE id = $1', [req.user.id]);

        if (userResult.rows.length === 0) return res.sendStatus(404);

        res.json({
            user: userResult.rows[0],
            profile: profileResult.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Profile
app.put('/api/profiles/:id', authenticateToken, async (req, res) => {
    if (req.params.id !== req.user.id) return res.sendStatus(403);

    const updates = req.body;
    const keys = Object.keys(updates).filter(k => k !== 'id' && k !== 'updated_at');

    if (keys.length === 0) return res.json({});

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(key => updates[key]);

    try {
        const result = await pool.query(
            `UPDATE profiles SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
            [...values, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// File Upload & Project Creation
app.post('/api/projects/upload', authenticateToken, upload.single('file'), async (req, res) => {
    const { title, bpm, key, refLink, notes } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filesMeta = {
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        size: file.size,
        mimeType: file.mimetype,
        bpm,
        key,
        refLink,
        notes
    };

    try {
        const result = await pool.query(
            'INSERT INTO projects (user_id, title, status, files_meta) VALUES ($1, $2, $3, $4) RETURNING *',
            [req.user.id, title, 'pending', JSON.stringify(filesMeta)]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Client: Get My Projects
app.get('/api/projects', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin: Get All Projects
app.get('/api/admin/projects', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*, u.email, u.full_name, u.avatar_url 
            FROM projects p 
            JOIN users u ON p.user_id = u.id 
            ORDER BY p.created_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin: Update Status
app.put('/api/admin/projects/:id/status', authenticateToken, authenticateAdmin, async (req, res) => {
    const { status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE projects SET status = $1 WHERE id = $2 RETURNING *',
            [status, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
