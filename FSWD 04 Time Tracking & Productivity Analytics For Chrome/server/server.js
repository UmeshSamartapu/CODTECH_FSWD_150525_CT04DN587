import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import trackerRoutes from './routes/tracker.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

try {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ MongoDB connected');

  // ✅ Route to handle /api/tracker/...
  app.use('/api/tracker', trackerRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('❌ DB connection error:', err);
}
