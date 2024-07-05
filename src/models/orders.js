import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    subOrders: [
      {
        chef: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Confirmed", "Cancelled", "Delivered"],
          default: "Pending",
        },
        dishes: [
          {
            dish: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "dishes",
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
              min: 1,
            },
            price: {
              type: Number,
              required: true,
              min: 0,
            },
          },
        ],
        gst: {
          type: Number,
        },
        shipping: {
          type: Number,
        },
        subTotal: {
          type: Number,
        },
        total: {
          type: Number,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
      enum: ["online", "cashOnDelivery"],
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models?.orders || mongoose.model("orders", orderSchema);

