import('dotenv/config');
import mongoose from 'mongoose';

// Connect to MongoDB
const dbURI = process.env.ATLAS_URI || '';

export default async function connectToDb() {
      try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');
      } catch (err) {
        console.log(err);
      }
}
    