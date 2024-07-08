import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
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
    },
    isVarified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  phone: {
    value: {
      type: String,
      unique: true,
      // required:true,
    },
    isVarified: {
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
    lat: {
      type: Number,
      required: function () {
        return this.userType === "Delivery_Boy";
      },
    },
    lng: {
      type: Number,
      required: function () {
        return this.userType === "Delivery_Boy";
      },
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
    default: "",
  },
  vacationtoDate: {
    type: Date,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
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

userSchema.index({ "location.lng": 1, "location.lat": 1 });

export default mongoose.models?.users || mongoose.model("users", userSchema);
