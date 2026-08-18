import mongoose from 'mongoose';

/**
 * Connects to MongoDB Atlas / Cloud instance using Mongoose
 */
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️ MONGODB_URI is not defined in environment variables. Database features will use in-memory state.');
      return;
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
  }
};

export default connectDB;
