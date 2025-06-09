import mongoose from "mongoose";
import { DB_NAME } from "../constant/constant.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/ResumeBuilder`);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
