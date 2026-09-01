import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { upload } from './config/upload.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(cors({ 
  origin: [
    'https://auth-system-dun-one.vercel.app',
    'http://localhost:5173'
  ]
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.put('/api/profile', upload.single('photo'), async (req, res) => {
  try {
    const { name, removePhoto } = req.body;
    const photoUrl = req.file ? (req.file as any).path : undefined;

    const updatedFields: Record<string, any> = { name };
    if (photoUrl) {
      updatedFields.photoUrl = photoUrl;
    }
    if (removePhoto === 'true') {
      updatedFields.photoUrl = null;
    }

    return res.status(200).json({
      message: 'Profile updated successfully',
      name,
      photoUrl,
    });
  } catch (error: any) {
    console.error('Error on route /api/profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});