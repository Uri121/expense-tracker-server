import mongoose from 'mongoose';
import { logger } from '../middleware/logger';

const mongoUri = process.env.MONGO_URI as string;

export const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri);
    logger.info('🚀 mongodb server is running');
  } catch (error: unknown) {
    logger.error(`error at ${error}`);
    process.exit(1);
  }
};
