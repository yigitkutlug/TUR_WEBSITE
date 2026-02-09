import mongoose from 'mongoose';

const PersonelSchema = new mongoose.Schema({
  ad: String,
  soyad: String,
  email: String,
  telefon: String,
  dogumTarihi: Date,
  cinsiyet: String,
  ikamet: String,
  egitim: String,
  calismaSekli: String,
  pozisyon: String,
  mesaj: String,
  tarih: { type: Date, default: Date.now },
});

export default mongoose.models.Personel || mongoose.model("Personel", PersonelSchema);
