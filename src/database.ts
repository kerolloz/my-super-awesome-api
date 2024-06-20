import mongoose from 'mongoose';
import { mongoURIEnvVar } from './config/index.js';

export async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURIEnvVar);
    console.info('Successfully connected to Mongodb ✅');
  } catch (err) {
    console.error(`Failed to connect to ${mongoURIEnvVar}`);
    throw err;
  }
}
