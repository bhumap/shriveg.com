import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "Customer",
    enum: ["Admin", "Customer", "Chef", "Delivery_Boy"],
  },
  email: {
    value: {
      type: String,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  phone: {
    value: {
      type: String,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  otp: {
    value: Number,
    expirationTime: Number,
  },
  address: {
    line1: { type: String },
    line2: { type: String },
    line3: { type: String },
    cityTown: { type: String },
    district: { type: String },
    state: { type: String },
    pinCode: { type: String },
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  isApproved: {
    type: Boolean,
    default: false,
    required: true,
  },
  vacationStatus: {
    type: Boolean,
    default: false,
    required: true,
  },
  vacationfromDate: {
    type: Date,
    default: null, // Use null instead of empty string for default Date value
  },
  vacationtoDate: {
    type: Date,
    default: null, // Use null instead of empty string for default Date value
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  referral_code: {
    type: String,
    required:true,
    unique: true
  },
  referred_by: {
    type: String
  },
  deviceTokens: [String],
  wallet: {
    balance: {
      type: Number,
      default: 0,
      required: true,
    },
  },
});

// Ensure index for location field
userSchema.index({ location: "2dsphere" });

// Export the model
export default mongoose.models?.users || mongoose.model("users", userSchema);
