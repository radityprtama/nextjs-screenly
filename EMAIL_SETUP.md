# 📧 Email Setup Guide

Untuk mengaktifkan fitur forgot password dengan email yang benar-benar terkirim, ikuti langkah-langkah berikut:

## 🔧 Setup Gmail SMTP

### 1. Enable 2-Factor Authentication

- Buka [Google Account Settings](https://myaccount.google.com/)
- Pilih **Security** > **2-Step Verification**
- Aktifkan 2FA jika belum aktif

### 2. Generate App Password

- Di halaman Security, pilih **App passwords**
- Pilih app: **Mail**
- Pilih device: **Other (custom name)**
- Masukkan nama: **Screenly App**
- Copy password yang di-generate (16 karakter)

### 3. Update Environment Variables

Tambahkan ke file `.env.local`:

```bash
# Email Configuration
EMAIL_USER="your-gmail@gmail.com"
EMAIL_PASS="your-16-digit-app-password"
```

**Contoh:**

```bash
EMAIL_USER="Screenly.app@gmail.com"
EMAIL_PASS="abcd efgh ijkl mnop"
```

## 🚀 Testing

1. Restart development server:

   ```bash
   npm run dev
   ```

2. Test forgot password:
   - Buka `/auth/forgot-password`
   - Masukkan email yang terdaftar
   - Cek inbox email untuk reset link

## 📧 Email Templates

Aplikasi akan mengirim 2 jenis email:

### 1. Password Reset Email

- **Subject:** "Reset Your Password - Screenly"
- **Content:** HTML email dengan reset link
- **Expiry:** 24 jam

### 2. Welcome Email (Optional)

- **Subject:** "Welcome to Screenly! 🎬"
- **Content:** Welcome message untuk user baru

## 🔒 Security Features

- ✅ Reset tokens disimpan di database
- ✅ Token expire dalam 24 jam
- ✅ Token hanya bisa digunakan sekali
- ✅ Old tokens dihapus saat generate yang baru
- ✅ Email tidak reveal apakah user exist atau tidak

## 🛠️ Alternative Email Services

Jika tidak ingin menggunakan Gmail, bisa ganti dengan:

### SendGrid

```bash
EMAIL_SERVICE="sendgrid"
SENDGRID_API_KEY="your-sendgrid-api-key"
```

### AWS SES

```bash
EMAIL_SERVICE="ses"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
```

### Mailgun

```bash
EMAIL_SERVICE="mailgun"
MAILGUN_API_KEY="your-mailgun-api-key"
MAILGUN_DOMAIN="your-domain.com"
```

## 🐛 Troubleshooting

### Email tidak terkirim?

1. Cek console log untuk error messages
2. Pastikan Gmail App Password benar
3. Pastikan 2FA sudah aktif di Google Account
4. Cek spam folder

### "Less secure app access" error?

- Gunakan App Password, bukan password biasa
- Pastikan 2FA aktif

### Rate limiting?

- Gmail SMTP limit: 500 emails/day
- Untuk production, gunakan service seperti SendGrid

## 📝 Development Mode

Jika `EMAIL_USER` dan `EMAIL_PASS` tidak di-set:

- Reset link akan di-log ke console
- Email tidak akan terkirim
- Masih bisa test flow reset password

## 🎯 Production Deployment

Untuk production:

1. Gunakan email service yang reliable (SendGrid, AWS SES)
2. Set up proper domain untuk email
3. Configure SPF, DKIM, DMARC records
4. Monitor email delivery rates
