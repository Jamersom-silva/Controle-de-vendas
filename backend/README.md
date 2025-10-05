# Backend - Sales Control (Node + Express + SQLite)

Endpoints:
- POST /auth/register { name,email,password } -> create user (password hashed)
- POST /auth/login { email,password } -> login
- POST /auth/recover { email } -> generate recovery token (returns token for testing)
- POST /auth/reset { email, token, newPassword } -> reset password
- POST /sync/push { users, products, sales } -> accept data and store (basic)

Run:
- npm install
- npm start

This backend stores data in SQLite (file: data.sqlite) for quick local testing.
