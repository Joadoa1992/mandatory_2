import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './db.js';
import { sendWelcomeEmail } from './mailer.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is humming along at http://localhost:${PORT}`);
});


const SALT_ROUNDS = 10;

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Validere
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // tjekker om user er der
        const userExists = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        //  Hasher koden
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const insertUser = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
        insertUser.run(email, hashedPassword);

        await sendWelcomeEmail(email);
        res.status(201).json({ message: "User created successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const SECRET_KEY = process.env.JWT_SECRET;

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // sammenligner hashed kode
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful!",
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Verify token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." });
        }
        req.user = user;
        next();
    });
};
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({
        message: "Welcome to your private dashboard, " + req.user.email,
        secretData: "This is a secret only logged-in users can see."
    });
});