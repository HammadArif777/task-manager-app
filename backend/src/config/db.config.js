import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}${process.env.DATABASE_NAME}`
    );

    console.log("DB IS CONNECTED");
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
  }
};
export default connectDB;
