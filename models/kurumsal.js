import mongoose from 'mongoose';

const kurumsalSchema = new mongoose.Schema({
  ad: String,
  soyad: String,
  firma: String,
  saat: String,
  guzergah: String,
  yolcu: Number,
  email: String,
  adres: String,
  mesaj: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Kurumsal", kurumsalSchema);
