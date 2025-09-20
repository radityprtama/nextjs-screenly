# 📧 SendGrid Setup untuk Reset Password

Panduan lengkap setup SendGrid untuk fitur reset password di Screenly.

## 🚀 Kenapa SendGrid?

- ✅ **Lebih Reliable** - Deliverability rate tinggi
- ✅ **Mudah Setup** - Tidak perlu app password Gmail
- ✅ **Professional** - Email tidak masuk spam
- ✅ **Free Tier** - 100 email/hari gratis
- ✅ **Analytics** - Track email delivery

## 📋 Step-by-Step Setup

### 1. Buat Akun SendGrid

1. Kunjungi [SendGrid.com](https://sendgrid.com/)
2. Klik **"Start for Free"**
3. Daftar dengan email Anda
4. Verifikasi email dan lengkapi profil

### 2. Dapatkan API Key

1. Login ke SendGrid Dashboard
2. Klik **Settings** → **API Keys**
3. Klik **"Create API Key"**
4. Pilih **"Restricted Access"**
5. Berikan nama: `Screenly Reset Password`
6. Set permissions:
   - **Mail Send**: `Full Access`
   - **Template Engine**: `Read Access` (optional)
7. Klik **"Create & View"**
8. **COPY API KEY** (hanya muncul sekali!)

### 3. Setup Domain Authentication (Recommended)

1. Klik **Settings** → **Sender Authentication**
2. Klik **"Authenticate Your Domain"**
3. Masukkan domain Anda (contoh: `yourdomain.com`)
4. Ikuti instruksi DNS setup
5. Tunggu verifikasi (bisa 24-48 jam)

### 4. Setup Single Sender (Alternative)

Jika tidak punya domain, gunakan Single Sender:

1. Klik **Settings** → **Sender Authentication**
2. Klik **"Create a Single Sender"**
3. Isi form:
   - **From Name**: `Screenly`
   - **From Email**: Email Anda yang valid
   - **Reply To**: Email yang sama
   - **Company**: `Screenly`
   - **Address**: Alamat lengkap
4. Klik **"Create"**
5. Cek email untuk verifikasi

### 5. Update Environment Variables

Edit file `.env.local` Anda:

```bash
# SendGrid Configuration
SENDGRID_API_KEY="SG.your-api-key-here"
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"  # atau email yang diverifikasi

# Keep Gmail as fallback (optional)
EMAIL_USER="your-gmail@gmail.com"
EMAIL_PASS="your-app-password"
```

## 🔧 Testing Setup

### 1. Test via API

Buat file test sederhana:

```javascript
// test-sendgrid.js
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('SG.your-api-key-here');

const msg = {
  to: 'your-test-email@gmail.com',
  from: 'noreply@yourdomain.com',
  subject: 'Test SendGrid',
  text: 'Hello from SendGrid!',
};

sgMail.send(msg)
  .then(() => console.log('Email sent successfully!'))
  .catch((error) => console.error('Error:', error));
```

### 2. Test Reset Password

1. Buka aplikasi Screenly
2. Klik **"Forgot Password"**
3. Masukkan email Anda
4. Cek inbox (dan spam folder)

## 🐛 Troubleshooting

### Error: "The from address does not match a verified Sender Identity"

**Solusi:**
1. Pastikan `SENDGRID_FROM_EMAIL` sama dengan email yang diverifikasi
2. Atau setup domain authentication

### Error: "Forbidden"

**Solusi:**
1. Cek API key permissions
2. Pastikan Mail Send = Full Access

### Email masuk spam

**Solusi:**
1. Setup domain authentication
2. Add SPF/DKIM records
3. Gunakan professional domain (bukan Gmail/Yahoo)

### Rate limit exceeded

**Solusi:**
1. Free tier: 100 email/hari
2. Upgrade plan jika perlu lebih

## 📊 Monitoring

### SendGrid Dashboard

1. **Activity** → Lihat email yang terkirim
2. **Statistics** → Track delivery rate
3. **Suppressions** → Cek bounced emails

### Application Logs

Cek console untuk log:
```
Sending email via SendGrid...
SendGrid email sent successfully: 202
```

## 🎯 Best Practices

### 1. Email Content
- ✅ Gunakan HTML template yang responsive
- ✅ Include plain text version
- ✅ Clear call-to-action button
- ✅ Professional branding

### 2. Security
- ✅ Simpan API key di environment variables
- ✅ Jangan commit API key ke Git
- ✅ Use restricted API key permissions
- ✅ Rotate API key secara berkala

### 3. Deliverability
- ✅ Setup domain authentication
- ✅ Use consistent from address
- ✅ Avoid spam trigger words
- ✅ Include unsubscribe link (untuk marketing emails)

## 🔄 Fallback System

Aplikasi sudah dikonfigurasi dengan fallback:

1. **Primary**: SendGrid (jika API key tersedia)
2. **Fallback**: Gmail/Nodemailer (jika SendGrid gagal)

## 📈 Upgrade Options

### Free Tier
- 100 emails/hari
- Basic analytics
- Email API

### Essentials ($19.95/bulan)
- 50,000 emails/bulan
- Advanced analytics
- 24/7 support

### Pro ($89.95/bulan)
- 100,000 emails/bulan
- Dedicated IP
- Advanced features

## 🎉 Hasil Akhir

Setelah setup berhasil:
- ✅ Reset password email terkirim dalam hitungan detik
- ✅ Email tidak masuk spam
- ✅ Professional branding
- ✅ Reliable delivery
- ✅ Analytics tracking

---

**Need Help?** Cek SendGrid documentation atau contact support mereka yang sangat responsif!
