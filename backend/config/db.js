import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.set('bufferCommands', false);
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/goldfork", {
            serverSelectionTimeoutMS: 2000
        });
        console.log(`[DB] MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.warn(`[DB Warning] MongoDB Connection Error (${error.message}). Running server with resilient fallback strategy.`);
    }
};

export default connectDB;
