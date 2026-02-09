# YİGİTUR

Tur şirketleri için geliştirilmiş, Node.js tabanlı bir web uygulamasıdır.  
Proje; web sitesi, admin paneli, mail gönderimi, form işlemleri ve güvenlik yapılarını içerir.

---

## 🚀 Özellikler

- 🌍 Tur şirketi tanıtım web sitesi
- 🧑‍💼 Admin paneli (AdminJS)
- 📩 İletişim formu üzerinden mail gönderimi
- 🔐 Session tabanlı admin girişi
- 🤖 Google reCAPTCHA entegrasyonu
- 🗄️ MongoDB veritabanı
- ⚙️ Ortam değişkenleri (`.env`) ile güvenli yapı

---

## 🛠️ Kullanılan Teknolojiler

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **AdminJS**
- **Nodemailer**
- **EJS (Template Engine)**
- **dotenv**
- **Google reCAPTCHA**

---

## 📁 Proje Yapısı

```text
yigitur-site/
│
├── app.js              # Ana uygulama dosyası
├── package.json        # Bağımlılıklar
├── models/             # MongoDB modelleri
├── routes/             # Express route dosyaları
├── views/              # EJS template dosyaları
├── public/             # Statik dosyalar (CSS, JS, img)
├── utils/              # Yardımcı fonksiyonlar
├── .adminjs/           # AdminJS build dosyaları
├── .env.example        # Ortam değişkenleri örneği
└── README.md
```

---

## ⚙️ Kurulum

### 1️⃣ Projeyi klonla

```bash
git clone https://github.com/yigitkutlug/TUR_WEBSITE.git
cd TUR_WEBSITE
```

### 2️⃣ Bağımlılıkları yükle

```bash
npm install
```

---

## 🔐 Ortam Değişkenleri (ENV)

Gerçek `.env` dosyası **repo’ya eklenmez**.
Önce `.env.example` dosyasını kopyalayarak oluştur:

```bash
cp .env.example .env
```

### `.env` Örneği

```env
MONGO_URI=YOUR_MONGO_URL
EMAIL_USER=EMAIL_USER
EMAIL_PASS=EMAIL_PASS
EMAIL_TO=EMAIL_TO
ADMIN_EMAIL=admin@example.com
ADMIN_PASS=STRONG_PASSWORD
SESSION_SECRET=SECRET_KEY
RECAPTCHA_SECRET_KEY=RECAPTCHA_KEY
```

> ⚠️ `.env` dosyası gizlidir ve `.gitignore` içindedir.

---

## ▶️ Uygulamayı Çalıştırma

```bash
npm start
```

veya geliştirme için:

```bash
node app.js
```

Varsayılan olarak:

```
http://localhost:3000
```

---

## 🧑‍💼 Admin Panel

Admin panel üzerinden:

* Veriler yönetilebilir
* İçerikler düzenlenebilir

Admin giriş bilgileri `.env` dosyası üzerinden belirlenir.

---

## 📩 Mail Sistemi

İletişim formu üzerinden gönderilen mesajlar:

* `EMAIL_TO` adresine mail olarak iletilir
* Nodemailer kullanır

Mail servis bilgileri `.env` içinden yönetilir.

---

## 🔒 Güvenlik

* Ortam değişkenleri ile gizli bilgiler korunur
* Google reCAPTCHA ile spam koruması
* Session secret ile admin oturum güvenliği

---

## 📌 Notlar

* `.env` dosyası **asla GitHub’a eklenmemelidir**
* Proje Node.js destekli sunucularda çalıştırılmalıdır
* Paylaşıma veya deploy’a uygundur

---

## 👤 Geliştirici

**Yiğit Kutluğ**
GitHub: [https://github.com/yigitkutlug](https://github.com/yigitkutlug)

---

## 📄 Lisans

Bu proje kişisel ve ticari projelerde kullanılabilir.

````

