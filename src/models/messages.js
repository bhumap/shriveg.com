// models/message.js

import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  addressId: { type: String, required: true },
  User_Id: { type: String, required: true },
  orderId: { type: String, required: true },
  read: { type: Boolean, default: false, required: true },
  confirmed: { type: Boolean, default: false },
  confirmedBy: { type: String },
  UniqueId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
