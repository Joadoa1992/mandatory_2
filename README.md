Secure Node.js Authentication API
A security-focused Node.js backend built to handle secure registration and login flows.

Key Features & Tech Stack:

Password Encryption: Uses bcrypt to salt and hash passwords securely.

Token-Based Auth: Generates jsonwebtoken (JWT) for secure user login sessions.

Server & Utilities: Built with Express, featuring cors handling, dotenv configuration, and an automated mailer module (mailer.js).


How to run:
mandatory_2/server
npm install
node index.js

mandatory_2/client
npm install --legacy-peer-deps
npm run dev

Har lavet en .env.example
hvor du kan slette .example også virker det
