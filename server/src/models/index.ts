import mongoose from 'mongoose';

export * from './conversions';

export const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL as string);
};
