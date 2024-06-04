import dbConnect from "@/config/dbConnect";
import ChefReviewsModel from "@/models/chefReviews";
import { JWTVerify } from "@/helpers/jwt";
const { ObjectId } = require("mongoose").Types;
import UsersModel from "@/models/users";

export default async function handler(req, res) {
  await dbConnect();

  var token = req.cookies.AccessToken || "";
  var userID = await JWTVerify(token)


  if (!userID) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized Action!",
    });
  }


  switch (req.method) {
    case "GET":
      try {
        var match = {};

        const page = req.query.page || 1;
        const limit = req.query.limit || 30;
        const skip = (page - 1) * limit;

        if(req.query.chefID){
            match.chef = new ObjectId(req.query.chefID)
        }


        const reviews = await ChefReviewsModel.find(match).populate({path:"customer",model:UsersModel,select:["fullName","photo","userType"]}).sort({createdAt:-1})
        const total = await ChefReviewsModel.find(match).count();

        var starting = total ? skip + 1 : 0;
        var ending =
          starting + limit - 1 > total ? total : starting + limit - 1;

        res.status(200).json({
          success: true,
          message: {
            data: reviews,
            count: total,
            starting,
            ending,
          },
        });


      } catch (error) {
        console.log(error)
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
      break;
    case "POST":
      try {

        var item = await ChefReviewsModel.create({...req.body,customer:userID});

        res.status(201).json({
          success: true,
          message: "Review Submitted Successfully!",
        });
      } catch (err) {
        // For duplicate Error
        if (err.code === 11000) {
          return res.status(409).json({
            success: false,
            message: `${Object.keys(err.keyPattern)[0]} is already in used!`,
          });
        }

        // required fields error handling
        var requiredFildName = Object.keys(err.errors)[0];
        if (requiredFildName) {
          return res.status(400).json({
            success: false,
            message: `${requiredFildName} is required!`,
          });
        }

        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      break;
  }
}
