import mongoose from 'mongoose';

const taseronSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  soyad: { type: String, required: true },
  email: { type: String, required: true },
  telefon: { type: String, required: true },
  plaka: { type: String, required: true },
  marka: { type: String, required: true },
  model: { type: String, required: true },
  modelYili: { type: String, required: true },
  kapasite: { type: String, required: true },
  adres: { type: String, required: true },
  mesaj: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Taseron", taseronSchema);
