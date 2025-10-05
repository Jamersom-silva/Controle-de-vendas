# Sales Control - Final Package

Includes:
- mobile/ : Expo React Native app (offline-first, SQLite) with sync hooks to backend.
- backend/: Node + Express + SQLite backend for auth, sync and password recovery.

## Run backend
cd backend
npm install
npm start
Backend listens on http://localhost:3000 (use 10.0.2.2:3000 on Android emulator).

## Run mobile (development)
cd mobile
npm install
# edit src/config.ts to set BACKEND_URL to your machine IP if testing on a physical device.
npm run start

## Notes
- Password recovery endpoint `/auth/recover` returns a token (for testing) — in production integrate email sending (nodemailer or third-party).
- Sync endpoint `/sync/push` accepts arrays of users/products/sales (very basic).
