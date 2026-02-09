import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * @param {string} baslik - Mailin konusu
 * @param {object} veriler - Formdan gelen veriler (req.body)
 * @param {boolean} kullaniciyaYolla - Kullanıcıya otomatik teşekkür maili gönderilsin mi
 */
const mailGonder = async (baslik, veriler, kullaniciyaYolla = true) => {
  const html = `
    <h2>${baslik}</h2>
    ${Object.entries(veriler)
      .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
      .join("")}
  `;

  // Admin'e mail gönder
  await transporter.sendMail({
    from: `"Başvuru Sistemi" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: baslik,
    html,
  });

  // Kullanıcıya otomatik teşekkür maili
  if (kullaniciyaYolla && veriler.email) {
    const kullaniciMesaji = `
      <p>Sayın ${veriler.ad || "Kullanıcı"},</p>
      <p>Başvurunuz başarıyla alınmıştır. En kısa sürede tarafınıza dönüş sağlanacaktır.</p>
      <p>Teşekkür ederiz.<br>Yigiturtur Taşımacılık</p>
    `;

    await transporter.sendMail({
      from: `"Yigiturtur" <${process.env.EMAIL_USER}>`,
      to: veriler.email,
      subject: "Başvurunuz Alındı",
      html: kullaniciMesaji,
    });
  }
};

export default mailGonder;
