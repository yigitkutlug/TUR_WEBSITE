import mongoose from 'mongoose';

const iletisimSchema = new mongoose.Schema({
  ad: String,
  soyad: String,
  email: String,
  mesaj: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Iletisim", iletisimSchema);
