import express from "express";
const router = express.Router();

import Basvuru from "../models/personel.js";
import Sofor from "../models/sofor.js";
import Kurumsal from "../models/kurumsal.js";
import mailGonder from "../utils/mails.js";

// 🏠 Anasayfa
router.get("/", (req, res) => {
  const logos = [];
  for (let i = 1; i <= 10; i++) {
    logos.push({
      name: `Firma ${i}`,
      url: `/images/firma${i}.png`
    });
  }
  res.render("pages/index", { logos });
});

// 👤 Personel Başvuru Formu
router.get("/personel-form", (req, res) => {
  res.render("pages/forms/personel-form", { title: "Personel Başvuru" });
});

router.post("/personel-form", async (req, res) => {
  try {
    const yeniBasvuru = new Basvuru(req.body);
    await yeniBasvuru.save();
    await mailGonder("Yeni Personel Başvurusu", req.body);
    res.redirect("/tesekkurler");
  } catch (err) {
    console.error("Personel formu hatası:", err);
    res.status(500).send("Bir hata oluştu.");
  }
});

// 🚐 Şoför Başvuru Formu
router.get("/sofor-form", (req, res) => {
  res.render("pages/forms/sofor-form", { title: "Şoför Başvuru" });
});

router.post("/sofor-form", async (req, res) => {
  try {
    const yeniSofor = new Sofor(req.body);
    await yeniSofor.save();
    await mailGonder("Yeni Şoför Başvurusu", req.body);
    res.redirect("/tesekkurler");
  } catch (err) {
    console.error("Şoför formu hatası:", err);
    res.status(500).send("Bir hata oluştu.");
  }
});

// 🏢 Kurumsal Başvuru Formu
router.get("/kurumsal-form", (req, res) => {
  res.render("pages/forms/kurumsal-form", { title: "Kurumsal Başvuru" });
});

router.post("/kurumsal-form", async (req, res) => {
  try {
    const yeniKurumsal = new Kurumsal(req.body);
    await yeniKurumsal.save();
    await mailGonder("Yeni Kurumsal Başvurusu", req.body);
    res.redirect("/tesekkurler");
  } catch (err) {
    console.error("Kurumsal formu hatası:", err);
    res.status(500).send("Bir hata oluştu.");
  }
});

// 🙏 Teşekkür Sayfası
router.get("/tesekkurler", (req, res) => {
  res.render("pages/tesekkurler", { title: "Teşekkürler" });
});

export default router;
