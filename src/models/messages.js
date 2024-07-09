import mongoose from "mongoose";
import orders from "./orders";

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: { type: String, required: true },


  
  read: {
    type: Boolean,
    default: false,
    required: true,
  },

  confirmed: { type: Boolean, default: false },
  confirmedBy: {
    type: String,
  },

  UniqueId: { type: String, Unique: true },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
