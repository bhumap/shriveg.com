import dbConnect from "@/config/dbConnect";
import DishesModel from "@/models/dishes";
import { JWTVerify } from "@/helpers/jwt";
import UsersModel from "@/models/users";
const { ObjectId } = require("mongoose").Types;


function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; 
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default async function handler(req, res) {
  await dbConnect();

  var token = req.cookies.AccessToken || "";
  var userID = (await JWTVerify(token)) || req.query.id;

  switch (req.method) {
    case "GET":
      try {
        var match = {};

        if (req.query.s) {
          match.title = new RegExp(req.query.s, "i");
        }

        const Chef = await UsersModel.findOne(
          { username: req.query.chef },
          { password: false }
        );

        if (req.query.chef) {
         
          match.chef = new ObjectId(Chef._id);
        }
        const currentDate = new Date();
        const properties = await DishesModel.aggregate([
          { $match: { ...match, status: "Published", isActive: true } },
          {
            $lookup: {
              from: "users",
              localField: "chef",
              foreignField: "_id",
              as: "chef",
            },
          },
          {
            $set: {
              chef: { $arrayElemAt: ["$chef", 0] },
            },
          },
          {
            $match: {
              "chef.isActive": true,
              "chef.vacationStatus": false,
              $or: [
                {
                  // "chef.vacationfromDate": { $exists: false },
                  // "chef.vacationfromDate": { $eq: '' },
                  // "chef.vacationtoDate": { $exists: false },
                  // "chef.vacationtoDate": { $exists: '' },
                },
                {
                  $and: [
                    { "chef.vacationfromDate": { $lte: currentDate } },
                    { "chef.vacationtoDate": { $gte: currentDate } },
                  ],
                },
              ],
            },
          },
          {
            $project: {
              "chef.address": false,
              "chef.coverPhoto": false,
              "chef.email": false,
              "chef.password": false,
              "chef.userType": false,
            },
          },
          { $sort: { createdAt: -1 } },
        ]);

        const lat = parseFloat(req.query.lat);
        const lon = parseFloat(req.query.lon);

        const filteredProperties = properties.filter(dish => {
          const distance = calculateDistance(
            lat,
            lon,
            dish.latitude,
            dish.longitude
          );
          return distance <= 10;
        });

        const total = await DishesModel.countDocuments({
          ...match,
          status: "Published",
        });

        res.status(200).json({
          success: true,
          message: {
            data: filteredProperties,
            chef: Chef,
            count: total,
          },
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      break;
    case "POST":
      try {
        var token = req.cookies.AccessToken || "";
        var userID = (await JWTVerify(token)) || req.query.id;

        if (!req.body.title) {
          return res.status(400).json({
            success: false,
            message: "Title is Required!",
          });
        }

        var item = await DishesModel.create({ ...req.body, chef: userID });

        res.status(201).json({
          success: true,
          message: "Added Successfully!",
          data: item,
        });
      } catch (err) {
        console.log(err);

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
