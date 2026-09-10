# T-Travels Backend

Express + MongoDB REST API for the T-Travels vehicle rental platform.

## Setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set MONGO_URI (local MongoDB or a free MongoDB Atlas cluster)
npm run seed   # creates demo driver, customer, and 8 demo vehicles
npm run dev    # starts the API on http://localhost:5000
```

## Demo logins (after running `npm run seed`)

| Role     | Email                  | Password    |
|----------|-------------------------|-------------|
| Driver   | driver@ttravels.demo    | password123 |
| Customer | customer@ttravels.demo  | password123 |

## API overview

- `POST /api/auth/signup` / `POST /api/auth/login` / `GET /api/auth/me`
- `GET /api/vehicles` (query: `type`, `status`, `search`)
- `GET /api/vehicles/:id`
- `POST /api/vehicles` (driver)
- `PATCH /api/vehicles/:id` (driver, own vehicle)
- `GET /api/vehicles/driver/mine` (driver)
- `POST /api/bookings` (customer)
- `GET /api/bookings/my` (customer)
- `GET /api/bookings/driver` (driver)
- `PATCH /api/bookings/:id/status`
- `GET /api/notifications`
- `PATCH /api/notifications/:id/read`

All protected routes need `Authorization: Bearer <token>` from the login/signup response.
