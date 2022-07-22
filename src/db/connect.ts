import mongoose from 'mongoose';
import { logger } from '../middleware/logger';
import config from '../config/default.config';

const { dbUri } = config;

export const connectDb = async () => {
  try {
    await mongoose.connect(dbUri);
    logger.info('🚀 mongodb server is running');
  } catch (error: unknown) {
    logger.error(`error at ${error}`);
    process.exit(1);
  }
};
