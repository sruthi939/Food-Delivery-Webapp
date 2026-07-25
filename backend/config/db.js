import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/goldfork');
        console.log(`[DB] MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.warn(`[DB Warning] Could not connect to local MongoDB (${error.message}). Running server with in-memory storage fallback.`);
    }
};
