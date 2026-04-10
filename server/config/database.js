import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️  WARNING: MONGODB_URI not found in .env file');
      console.warn('📝 Please configure your MongoDB connection:');
      console.warn('   1. Update .env with your MongoDB URI');
      console.warn('   2. Or install MongoDB locally: https://www.mongodb.com/try/download/community');
      console.warn('   3. Or use MongoDB Atlas (free): https://www.mongodb.com/cloud/atlas');
      console.warn('\n✅ Frontend will still work but database operations will fail.');
      console.warn('🚀 Continue with frontend for now, fix MongoDB later.');
      return null;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('\n⚠️  DATABASE CONNECTION FAILED');
    console.warn('Your app will still run, but database operations will fail.');
    console.warn('\nTo fix this:');
    console.warn('1. Make sure MongoDB is running (mongod command)');
    console.warn('2. Or update MONGODB_URI in .env with valid credentials');
    console.warn('3. Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas\n');
    return null;
  }
};

export default connectDB;
