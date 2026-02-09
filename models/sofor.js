import mongoose from 'mongoose';

const SoforSchema = new mongoose.Schema({
  ad: String,
  soyad: String,
  email: String,
  telefon: String,
  ehliyet: String,
  tarih: { type: Date, default: Date.now },
});

export default mongoose.model("Sofor", SoforSchema);
