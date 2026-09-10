# T-Travels Frontend

Next.js (App Router) + Tailwind CSS + Framer Motion.

## Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
# make sure NEXT_PUBLIC_API_URL points at your running backend
npm run dev
```

Visit http://localhost:3000. The homepage and vehicle listing will fetch
live data from the backend if it's running (and seeded), and quietly
fall back to demo data in `lib/data.js` if it isn't - so you can work
on the UI even before the backend is wired up.

## Notes on structure

- `app/` - one folder per route, following Next's App Router conventions.
- `components/home`, `components/vehicle`, `components/layout`, `components/ui` -
  grouped by what they're used for, not by page.
- `components/icons/VehicleIllustration.js` - hand-drawn SVG placeholders
  for each vehicle type (JCB, tractor, crane, etc), each with a small
  CSS-driven animation (arm bob, wheel spin, crane sway). These stand in
  for real vehicle photos so there are no broken image links in the demo -
  swap this component out for real `<img>`/Next `<Image>` tags once you
  have photography or user-uploaded images.
- `context/AuthContext.js` - holds the logged-in user + JWT in memory and
  localStorage, exposes `useAuth()`.
- `lib/api.js` - the only place that talks to the backend. Every page/component
  calls through this, rather than using `fetch` directly.

## Known limitations (by design, for a learning project)

- Notifications are polled every 15 seconds on the driver dashboard
  rather than pushed - this is the intentional Phase 1 approach described
  in the project plan. Swapping to Socket.IO later means adding a socket
  server and replacing the `setInterval` poll with a socket listener; the
  `Notification` data model does not need to change.
- No image upload yet - vehicles use illustrated placeholders (see above).
- No payments integration.
