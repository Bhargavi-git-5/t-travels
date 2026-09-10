# T-Travels

A full-stack vehicle rental and booking platform, built as a learning
project. Frontend and backend are separate apps - run both together
during development.

```
t-travels/
├── frontend/   Next.js + Tailwind + Framer Motion
└── backend/    Express + MongoDB + JWT
```

## Quick start

**Terminal 1 - backend**
```bash
cd backend
npm install
cp .env.example .env      # then edit .env with your MongoDB URI
npm run seed               # creates demo driver, customer, and 8 vehicles
npm run dev                # http://localhost:5000
```

**Terminal 2 - frontend**
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev                # http://localhost:3000
```

You need a MongoDB database. The easiest free option if you don't want
to install MongoDB locally is a free-tier cluster on MongoDB Atlas -
create one, copy its connection string into `backend/.env` as `MONGO_URI`.

## Demo logins (after `npm run seed`)

| Role     | Email                   | Password    |
|----------|--------------------------|-------------|
| Driver   | driver@ttravels.demo     | password123 |
| Customer | customer@ttravels.demo   | password123 |

Try this flow: log in as the customer, book a vehicle for a few hours,
then open a second browser (or incognito window), log in as the driver,
and accept the booking from the driver dashboard.

## What's implemented (Phase 0-6 of the original plan)

- Responsive homepage, vehicle listing with filters, vehicle detail page
- JWT auth (signup/login) for both customer and driver roles
- Booking flow with server-side price recalculation (never trusts the
  frontend's number)
- In-app notifications, written to MongoDB and polled by the driver
  dashboard
- Driver dashboard: manage vehicles, accept/reject booking requests
- Customer dashboard: view booking history and status

## What's next (Phase 7+, not yet built)

- Socket.IO real-time push instead of polling
- Admin role/panel
- Payments
- Vehicle photo upload (currently illustrated placeholders)
- Reviews/ratings, availability calendar (date ranges, not just a status flag)

See `frontend/README.md` for a couple of known rough edges worth fixing
before this goes anywhere near production (in particular: booking-detail
authorization).
