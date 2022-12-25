import mongoose from 'mongoose';

export * from './conversions';

/**
 * Connects to the DB
 */
export const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL as string);
};
