# 📧 Email Deliverability - Cara Agar Tidak Masuk Spam

Panduan lengkap untuk memastikan email reset password tidak masuk spam folder.

## 🎯 Masalah Utama

Email masuk spam karena:
- ❌ **Sender tidak terverifikasi**
- ❌ **Tidak ada SPF/DKIM records**
- ❌ **Menggunakan Gmail sebagai sender**
- ❌ **Content terdeteksi sebagai spam**
- ❌ **Reputation domain rendah**

## 🚀 Solusi Lengkap

### 1. **Setup Domain Authentication (Recommended)**

#### **Mengapa Perlu Domain Sendiri?**
- ✅ **Professional appearance** (`noreply@yourdomain.com`)
- ✅ **Better deliverability** (tidak masuk spam)
- ✅ **Brand trust** (pengguna lebih percaya)
- ✅ **SPF/DKIM support** (authentication)

#### **Step-by-Step Domain Setup:**

1. **Beli Domain** (jika belum punya)
   - Namecheap, GoDaddy, Cloudflare, dll
   - Contoh: `screenly.app`, `yourdomain.com`

2. **Setup di SendGrid**
   - Login SendGrid Dashboard
   - **Settings** → **Sender Authentication**
   - **Authenticate Your Domain**
   - Masukkan domain Anda
   - Copy DNS records yang diberikan

3. **Setup DNS Records**
   ```
   Type: CNAME
   Name: s1._domainkey
   Value: s1.domainkey.u1234567.wl123.sendgrid.net
   
   Type: CNAME  
   Name: s2._domainkey
   Value: s2.domainkey.u1234567.wl123.sendgrid.net
   ```

4. **Tunggu Verifikasi** (24-48 jam)

### 2. **Alternative: Subdomain Setup**

Jika tidak ingin beli domain baru, gunakan subdomain:

#### **Setup Subdomain di Cloudflare (Gratis)**
1. Daftar di [Cloudflare](https://cloudflare.com/)
2. Add domain yang sudah ada
3. Buat subdomain: `mail.yourdomain.com`
4. Setup DNS records untuk SendGrid

#### **Update Environment Variables**
```bash
SENDGRID_FROM_EMAIL="noreply@mail.yourdomain.com"
```

### 3. **Improve Email Content**

Mari update template email untuk menghindari spam filters:
