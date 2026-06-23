# Screenly - Modern Streaming Discover Catalogue

A high-fidelity, responsive, Netflix-inspired streaming discovery catalogue integrated with a local Puppeteer-based scraper API.

## Features

- 🎬 **Scraper API Integration** - Connects directly to a local scraper API for real-time media indexing.
- 🎨 **Redesigned Netflix-style UI** - Beautiful transparent sticky navigation bar, dynamic sliding media rails, responsive grids, and API status badges.
- ❤️ **Local Watchlist Persistence** - Client-side state persistence via SSR-safe `localStorage` with real-time multi-tab synchronization.
- 📱 **Robust Error Boundary Handling** - Parallel server-side loading using `Promise.allSettled` to insulate sections from backend scraper connection glitches.
- 🔍 **Real-time debounced Search** - Query the catalog with auto-debounce searching to prevent server hammering.
- 🛡️ **Upstream Health Monitoring** - Visual connection badge displays connection states dynamically.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Vanilla CSS + Lucide React
- **Authentication**: NextAuth.js
- **State Management**: React state synced to `localStorage`

## Getting Started

### 1. Configure the Scraper API
Inside the `/projects/screnly/IDLIX-API` folder:
1. Verify the `.env` configuration has the target port set to `3001` to prevent collisions:
   ```ini
   PORT=3001
   ```
2. Initialize and run:
   ```bash
   npm install
   npx puppeteer browsers install chrome
   npm start
   ```

### 2. Configure Next.js Screenly
Inside the `/projects/screnly/nextjs-screenly` folder:
1. Create or edit `.env` and add:
   ```env
   NEXT_PUBLIC_IDLIX_API_BASE_URL="http://localhost:3001/api"
   ```
2. Build and run:
   ```bash
   npm install
   npm run dev
   ```

## Folder Structure & Modifications

- `app/api/idlix/[[...path]]/route.ts` - Client-side route proxy to bypass CORS restrictions.
- `lib/api/`
  - `idlix-types.ts` - TypeScript interface representations.
  - `idlix-normalizers.ts` - Helper utilities that map scrape-returns to normalized types.
  - `idlix-client.ts` - Central fetch agent for queries.
- `hooks/use-watchlist.ts` - Client-side watchlist persistence hook.
- `components/`
  - `media-card.tsx` - Replaced TMDB `movie-card.tsx` with a flexible card layout.
  - `movie-detail-modal.tsx` - Metadata inspector and disclaimer details.
  - `api-status-badge.tsx` - Health indicator.
  - `app-shell.tsx` & `footer.tsx` - Outer app shell layers.

## License

This project is for educational purposes.
