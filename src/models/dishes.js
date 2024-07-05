const mongoose = require("mongoose");
const { Schema } = mongoose;

const dishesSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    images: [
      {
        secure_url: { type: String },
        public_id: { type: String },
      },
    ],
    price: { type: Number },
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: ["Drafted", "Active"],
      default: "Drafted",
      required: true,
    },
    isSignatured: {
      type: Boolean,
      default: false,
    },
    servingPerson: {
      type: String,
    },
    isActive:{
      type: Boolean,
      default: true,
      required:true
    },
     category: {
      type: String,
    },
    latitude: {
      type: Number,

    },
    longitude: {
      type: Number,

    },
  },
  { timestamps: true }
);

var DishesModel =
  mongoose.models?.dishes || mongoose.model("dishes", dishesSchema);
export default DishesModel;
