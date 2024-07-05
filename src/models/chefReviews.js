const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChefReviewsSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },

   
  },
  { timestamps: true }
);

var ChefReviews =
  mongoose.models?.chefReviews ||
  mongoose.model("chefReviews", ChefReviewsSchema);
export default ChefReviews;
