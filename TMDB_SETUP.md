# 🎬 TMDB Movie Database Setup

Panduan lengkap untuk mengambil semua film dari TMDB API dan memasukkannya ke database lokal.

## 📋 Prerequisites

1. **TMDB API Key** - Sudah tersedia di `.env.local`
2. **Database** - Pastikan Prisma database sudah setup
3. **Dependencies** - Semua package sudah terinstall

## 🚀 Cara Menggunakan

### 1. Test Koneksi TMDB (Recommended)

Jalankan test script terlebih dahulu untuk memastikan semuanya berfungsi:

```bash
npm run fetch:movies:test
```

Script ini akan:
- ✅ Test koneksi ke TMDB API
- ✅ Menampilkan 5 film populer
- ✅ Mencoba menyimpan 1 film ke database
- ✅ Menampilkan statistik database

### 2. Fetch Movies dari TMDB

Setelah test berhasil, jalankan script utama:

```bash
npm run fetch:movies
```

Script ini akan mengambil film dari 5 kategori:
- 🔥 **Popular Movies** - Film populer saat ini
- ⭐ **Top Rated Movies** - Film dengan rating tertinggi
- 🎭 **Now Playing** - Film yang sedang tayang
- 🔮 **Upcoming** - Film yang akan datang
- 🎯 **Discover** - Film berdasarkan popularitas

## ⚙️ Konfigurasi

### Mengatur Jumlah Film

Edit file `scripts/fetch-tmdb-movies.ts` pada baris ini:

```typescript
// Ubah angka 5 untuk mengatur berapa halaman per kategori
await fetcher.fetchAndSaveAllMovies(5) // 5 halaman = ~100 film per kategori
```

**Perhitungan:**
- 1 halaman = ~20 film
- 5 halaman = ~100 film per kategori
- 5 kategori × 100 film = **~500 film total**

### Rate Limiting

Script sudah dilengkapi dengan rate limiting:
- ⏱️ 250ms delay antar request
- 🔄 Retry mechanism untuk error
- 🛡️ Handle rate limit dari TMDB

## 📊 Fitur Script

### 🔍 Duplicate Prevention
- Cek film yang sudah ada berdasarkan judul
- Skip film yang sudah tersimpan

### 📝 Data Mapping
Script mengambil data lengkap dari TMDB:
- **Title** - Judul film
- **Description** - Sinopsis
- **Poster & Backdrop** - Gambar film
- **Genre** - Kategori film
- **Year** - Tahun rilis
- **Rating** - Rating TMDB
- **Duration** - Durasi film
- **Trailer** - Link YouTube trailer

### 🎯 Search Integration

API search sudah diupdate untuk:
1. **Prioritas Database Lokal** - Cari di database dulu
2. **Fallback ke TMDB** - Jika tidak ada hasil lokal
3. **Smart Search** - Cari di title, description, dan genre

## 🎮 Cara Penggunaan

### Step 1: Test Connection
```bash
npm run fetch:movies:test
```

### Step 2: Fetch Movies
```bash
npm run fetch:movies
```

### Step 3: Cek Database
```bash
npm run db:studio
```

## 📈 Monitoring Progress

Script akan menampilkan progress real-time:

```
🎬 Starting to fetch movies from TMDB (max 5 pages per category)...

📂 Fetching Popular movies...
📄 Fetching page 1...
✅ Saved: Spider-Man: No Way Home
✅ Saved: The Batman
❌ Error saving Duplicate Movie: already exists
📄 Fetching page 2...
...

📊 Total movies in database: 487
```

## ⚠️ Tips & Warnings

### 💡 Best Practices
1. **Mulai dengan test script** untuk memastikan setup benar
2. **Gunakan jumlah halaman kecil** untuk testing (1-2 halaman)
3. **Monitor log** untuk melihat progress dan error
4. **Backup database** sebelum fetch besar-besaran

### 🚨 Rate Limits
- TMDB API limit: **40 requests per 10 seconds**
- Script sudah handle ini dengan delay
- Jika tetap kena rate limit, script akan retry otomatis

### 💾 Storage Considerations
- ~500 film ≈ beberapa MB data
- Gambar poster/backdrop disimpan sebagai URL (tidak download)
- Database SQLite bisa handle ribuan film

## 🔧 Troubleshooting

### Error: "TMDB API key not found"
```bash
# Pastikan file .env.local ada dan berisi:
TMDB_API_KEY=c4c9c547f87ee22e5b1dd08d984bfc85
TMDB_BASE_URL="https://api.themoviedb.org/3"
```

### Error: "Database connection failed"
```bash
# Push schema ke database
npm run db:push
```

### Error: "Rate limited"
- Script akan retry otomatis
- Tunggu beberapa detik dan coba lagi

## 🎉 Hasil Akhir

Setelah berhasil, Anda akan memiliki:
- ✅ Database penuh dengan film dari TMDB
- ✅ Search yang cepat dari database lokal
- ✅ Fallback ke TMDB untuk film yang belum ada
- ✅ Data lengkap dengan poster, trailer, dll

## 📱 Testing Search

Setelah fetch selesai, test search di aplikasi:
1. Buka `/search`
2. Cari film seperti "Spider-Man", "Batman", dll
3. Hasil akan muncul dari database lokal (lebih cepat!)

---

**Happy Coding! 🚀**
