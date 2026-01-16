---
title: "Common Security Issues in Node.js Applications"
date: "2025-01-17"
author: "Volodymyr Loban"
---

Node.js is one of the most popular backend technologies today. From startups to enterprise systems, it powers APIs, real-time apps, and microservices around the world. But with great popularity comes great responsibility — and sadly, a lot of developers overlook security when building Node.js applications.

Whether you're working on a personal project or a production-grade platform, here are some of the most common security issues in Node.js apps — and how to fix them before they become a problem.

![Common Security Issues](/assets/Common-Security-Issues.png)

## 1. Using Vulnerable Packages

Node.js projects often rely heavily on third-party npm packages. But not all packages are safe or well-maintained.

**The Risk:**

You might unknowingly install a package with known vulnerabilities, or worse, one that's been hijacked to deliver malware (yes, it happens).

**What to Do:**

- Run `npm audit` regularly to detect known issues.
- Use tools like Snyk, Socket, or GitHub's Dependabot.
- Avoid packages that are outdated, poorly maintained, or have too many unresolved issues.

## 2. Hardcoding Secrets or API Keys

It's tempting to just drop your secret keys or database credentials right into your code. But this is a major security flaw.

**The Risk:**

If your code gets exposed (e.g., on GitHub), your secrets go with it — opening the door to attacks.

**What to Do:**

- Store secrets in environment variables.
- Use a `.env` file locally with `dotenv`.
- Use secret managers like AWS Secrets Manager, HashiCorp Vault, or 1Password in production.

```javascript
require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;
```

## 3. Lack of Input Validation

Node.js apps often take user input — via forms, queries, or APIs. But what happens if that input is malformed or malicious?

**The Risk:**

Unvalidated input can lead to SQL injection, NoSQL injection, XSS, or even app crashes.

**What to Do:**

- Validate and sanitize all incoming data.
- Use libraries like Joi, Zod, or express-validator.
- Never trust the client. Validate again on the backend.

```javascript
const { body } = require('express-validator');

app.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
], (req, res) => {
  // ...
});
```

## 4. NoSQL Injection in MongoDB Apps

In traditional SQL, injections are well known — but in MongoDB (used by many Node.js apps), NoSQL injections are a rising threat.

**The Risk:**

Attackers can send crafted queries that alter your MongoDB queries or expose unauthorized data.

**What to Do:**

- Use strict schema validation (e.g., with Mongoose).
- Don't pass raw JSON from user input into Mongo queries.
- Validate types and strip dangerous operators (`$ne`, `$gt`, `$where`).

```javascript
// Unsafe:
User.find({ username: req.body.username });

// Safer:
User.findOne({ username: sanitize(req.body.username) });
```

## 5. Insecure Authentication

Authentication is a critical part of almost every app — and also one of the most common sources of bugs.

**The Risk:**

Using weak password hashing, storing passwords in plain text, or failing to rate-limit login attempts opens the door to account takeovers.

**What to Do:**

- Use `bcrypt` or `argon2` to hash passwords.
- Never store plain text passwords.
- Implement rate limiting and 2FA where possible.
- Don't roll your own auth — consider using services like Auth0, Clerk, or Firebase Auth.

## 6. Misconfigured Cookies or JWTs

If you're using cookies or JWT tokens for sessions, configuration matters.

**The Risk:**

Misconfigured cookies can be stolen via XSS or sent over insecure HTTP.

**What to Do:**

- Set `HttpOnly`, `Secure`, and `SameSite=Strict` on cookies.
- Rotate and expire JWT tokens appropriately.
- Store secrets used to sign JWTs securely.

```javascript
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
});
```

## 7. Missing Helmet Headers

Node.js doesn't set security headers by default, leaving your app vulnerable to attacks like clickjacking and XSS.

**The Risk:**

Attackers can exploit your app through missing or misconfigured HTTP headers.

**What to Do:**

- Use Helmet, a middleware that adds essential HTTP headers to secure your app.

```javascript
const helmet = require('helmet');
app.use(helmet());
```

## 8. No Rate Limiting

Without rate limiting, your endpoints can be spammed with brute-force attacks or heavy traffic — potentially crashing your server.

**The Risk:**

Anyone can send 1000+ requests per second to your login or API endpoints.

**What to Do:**

- Use middleware like `express-rate-limit` to throttle incoming requests.

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use('/api', limiter);
```

## 9. Error Leakage in Production

Node.js apps often log helpful errors — but in production, these can reveal too much.

**The Risk:**

Attackers can learn your app's structure, libraries, or even secrets through stack traces or verbose errors.

**What to Do:**

- Don't expose stack traces or raw errors to users.
- Use centralized logging (e.g., Winston, Pino) and error monitoring (e.g., Sentry).
- Always set `NODE_ENV=production` in real deployments.

## 10. CORS Misconfiguration

Improper handling of CORS can expose your APIs to unauthorized cross-origin requests.

**The Risk:**

Anyone can interact with your APIs if CORS is open to `*`, including malicious frontends.

**What to Do:**

- Use the `cors` middleware carefully:

```javascript
app.use(cors({
  origin: 'https://yourfrontend.com',
  credentials: true
}));
```

- Never allow unrestricted origins in production unless it's intentional and secure.

## Final Thoughts

Securing a Node.js app is not just about using the right libraries — it's about knowing where your risks are and designing your system to reduce them.

Here's a quick checklist to keep your app safer:

- Keep dependencies updated
- Use environment variables for secrets
- Validate all user input
- Set security headers and cookies
- Implement rate limiting and logging

Security is an ongoing process — not a one-time setup. The earlier you bake it into your app, the safer you and your users will be.
