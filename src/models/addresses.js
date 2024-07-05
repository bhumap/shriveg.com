import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  title: { type: String,required:true },
  line1: { type: String },
  line2: { type: String },
  line3: { type: String },
  cityTown: { type: String },
  district: { type: String },
  state: { type: String },
  pinCode: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
},{timestamps:true});


export default mongoose.models?.addresses || mongoose.model("addresses", addressSchema);