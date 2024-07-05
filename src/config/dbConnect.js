import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log(error)
  }
};

export default dbConnect;