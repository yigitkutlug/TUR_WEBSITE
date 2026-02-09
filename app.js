import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import session from "express-session";
import fetch from "node-fetch";

import mailGonder from "./utils/mails.js";
import { adminJs, adminRouter } from "./utils/admin.js";

import Personel from "./models/personel.js";
import Sofor from "./models/sofor.js";
import Kurumsal from "./models/kurumsal.js";
import Taseron from "./models/taseron.js";
import Iletisim from "./models/iletisim.js";

import formRoutes from "./routes/formroutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

/* ================= SESSION ================= */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "super_secret_key_123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    },
  })
);

/* ================= MIDDLEWARE ================= */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ================= MONGODB ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

/* ================= ADMIN ================= */
app.use("/admin", (req, res, next) => {
  if (!req.session.isAuthenticated) return res.redirect("/login");
  next();
});
app.use(adminJs.options.rootPath, adminRouter);

/* ================= ROUTES ================= */
app.use("/", formRoutes);

app.get("/harita", (_, res) =>
  res.render("pages/harita", { title: "Hizmet Haritası" })
);

app.get("/belgeler", (_, res) =>
  res.render("pages/belgeler", { title: "Belgeler" })
);

app.get("/aydinlatma", (_, res) =>
  res.render("pages/aydinlatma", { title: "Aydınlatma Metni" })
);

/* ================= İLETİŞİM ================= */
app.get("/iletisim", (_, res) => {
  res.render("pages/iletisim", {
    title: "İletişim",
    success: false,
    error: false,
    recaptchaError: null,
  });
});

app.post("/iletisim", async (req, res) => {
  const recaptchaToken = req.body["g-recaptcha-response"];
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const recaptchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return res.render("pages/iletisim", {
        title: "İletişim",
        success: false,
        error: true,
        recaptchaError: "Lütfen robot olmadığınızı doğrulayın.",
      });
    }

    const yeniMesaj = new Iletisim(req.body);
    await yeniMesaj.save();
    await mailGonder("Yeni İletişim Formu", req.body);

    return res.render("pages/iletisim", {
      title: "İletişim",
      success: true,
      error: false,
      recaptchaError: null,
    });
  } catch (err) {
    console.error("İletişim formu hatası:", err);

    return res.render("pages/iletisim", {
      title: "İletişim",
      success: false,
      error: true,
      recaptchaError: "Bir hata oluştu. Lütfen tekrar deneyin.",
    });
  }
});

/* ================= AUTH ================= */
app.get("/login", (_, res) => {
  res.render("pages/login", {
    title: "Yetkili Giriş",
    error: null,
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASS
  ) {
    req.session.isAuthenticated = true;
    return res.redirect("/admin");
  }

  res.render("pages/login", {
    title: "Yetkili Giriş",
    error: "Geçersiz kullanıcı adı veya şifre",
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});

/* ================= FORMS ================= */
app.get("/personel-form", (_, res) =>
  res.render("pages/forms/personel-form", { title: "Personel Başvuru" })
);

app.get("/sofor-form", (_, res) =>
  res.render("pages/forms/sofor-form", { title: "Şoför Başvuru" })
);

app.get("/kurumsal-form", (_, res) =>
  res.render("pages/forms/kurumsal-form", { title: "Kurumsal Başvuru" })
);

app.get("/taseron-form", (_, res) =>
  res.render("pages/forms/taseron-form", { title: "Taşeron Başvuru" })
);

app.post("/taseron-form", async (req, res) => {
  const yeniTaseron = new Taseron(req.body);
  await yeniTaseron.save();
  await mailGonder("Yeni Taşeron Başvurusu", req.body);
  res.redirect("/tesekkurler");
});

/* ================= BAŞVURULAR ================= */
app.get("/basvurular", (_, res) => {
  const basvurular = [
    {
      title: "Şoför Başvurusu",
      img: "/images/sofor.png",
      desc: "Bizimle çalışmak isteyen şoförler için başvuru formu.",
      link: "/sofor-form",
      icon: "truck-front-fill",
    },
    {
      title: "Personel Başvurusu",
      img: "/images/Rotalama1.png",
      desc: "Bizimle çalışmak isteyen personeller için başvuru formu.",
      link: "/personel-form",
      icon: "person-fill-check",
    },
    {
      title: "Kurumsal Başvuru",
      img: "/images/kurumsal.png",
      desc: "Bizimle çalışmak isteyen şirketler için başvuru formu.",
      link: "/kurumsal-form",
      icon: "building",
    },
    {
      title: "Taşeron Başvurusu",
      img: "/images/otobus1.png",
      desc: "Bizimle çalışmak isteyen taşeronlar için başvuru formu.",
      link: "/taseron-form",
      icon: "building-gear",
    },
  ];

  res.render("pages/basvurular", {
    title: "Başvuru Türü Seçimi",
    basvurular,
  });
});

/* ================= 404 ================= */
app.use((req, res) => {
  res.status(404).render("pages/404", { url: req.originalUrl });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
