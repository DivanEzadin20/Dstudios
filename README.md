# D STUDIOS

Modern Node.js + Express application with MySQL database for product management.

## Features
- Product CRUD via REST API `/api/products`
- MySQL schema + migrations
- Script endpoints (legacy) retained in `server.js` if needed

## Setup
1. Copy `.env.example` to `.env` and adjust values.
2. Install dependencies: `npm install`
3. Initialize DB: `npm run init-db`
4. (Optional) Run migrations: `npm run migrate-db`
5. Start server: `npm start`

## Scripts
- `npm run init-db` Create database + apply base schema
- `npm run migrate-db` Apply SQL files in `migrations/`
- `npm run db:test` Quick connectivity check

## API Endpoints (app.js)
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
 - `POST /api/upload/image` (multipart/form-data field: `image`) returns `{ success, url }`

### Admin Dashboard
Navigate to `/admin` after starting the server. Use the form to:
- Upload an image file (stored under `public/uploads/`)
- Or provide an external image URL
- Create, edit, delete products stored in MySQL

Temporary login credentials are hard-coded in `upload.html` (replace with real auth):
```
username: admin
password: dstudios123
```

## Environment Variables
See `.env.example` for required variables.

## Next Steps
- Add auth for admin routes
- Implement product ratings (table exists)
- Add pagination + search
 - Harden file upload validation & size limits
 - Move admin credentials to secure auth (sessions/JWT)

