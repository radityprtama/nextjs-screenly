# Screenly - Next.js Movie Streaming App

A modern, full-stack movie streaming app (Netflix-like) built with Next.js App Router, TypeScript, Tailwind CSS, Prisma (SQLite), NextAuth, and TMDB API.

## Features

- 🎬 Real movie data from TMDB API
- 🔐 Authentication (email/password) with NextAuth
- 🎨 Modern Netflix-style UI with Tailwind CSS
- 📱 Responsive design
- 🔍 Movie search functionality
- ❤️ Personal watchlist
- 🎥 Video player with sample videos
- 📊 Movie details, ratings, and trailers

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + Framer Motion
- Prisma + SQLite
- NextAuth.js
- TMDB API
- Radix UI + Lucide React icons

## Getting Started

### 1. Get TMDB API Key

1. Go to [TMDB](https://www.themoviedb.org/) and create an account
2. Go to Settings > API and request an API key
3. Copy your API key

### 2. Setup Environment

```bash
# Copy environment file
cp .env.example .env.local

# Edit .env.local and add your TMDB API key:
TMDB_API_KEY="your-tmdb-api-key-here"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup Database

```bash
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages & Features

- **Home** (`/`) - Featured movies, trending, and popular
- **Movies** (`/movies`) - Browse popular, top-rated, and now playing
- **Search** (`/search`) - Search movies by title
- **Movie Detail** (`/movie/[id]`) - Movie details, trailer, and related movies
- **Watch** (`/watch/[id]`) - Video player (requires login)
- **Watchlist** (`/watchlist`) - Personal movie list (requires login)
- **Auth** (`/auth/signin`, `/auth/signup`) - Authentication pages

## Environment Variables

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# TMDB API (Required)
TMDB_API_KEY="your-tmdb-api-key-here"
TMDB_BASE_URL="https://api.themoviedb.org/3"
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run db:push` — Push Prisma schema to database
- `npm run db:studio` — Open Prisma Studio

## Notes

- Movie data is fetched from TMDB API with 1-hour caching
- Video playback uses sample videos for demo purposes
- Watchlist data is stored in local SQLite database
- Images are served from TMDB CDN
