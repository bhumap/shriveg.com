import dbConnect from "@/config/dbConnect";
import DishesModel from "@/models/dishes";
import { JWTVerify } from "@/helpers/jwt";
import mongoose from 'mongoose'


export default async function handler(req, res) {
  await dbConnect();

  var token = req.cookies.AccessToken || "";
  var userID = (await JWTVerify(token)) || req.query.id;

  try {

    var match = {
      chef: new mongoose.Types.ObjectId(userID)
    };

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    if (req.query.s) {
      match.title = new RegExp(req.query.s, "i")
    }

    if (req.query.status) {
      match.status = req.query.status;
    }


    const dishes = await DishesModel.find(match)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    const total = await DishesModel.find(match).count();

    var starting = total ? skip + 1 : 0;
    var ending = starting + limit - 1 > total ? total : starting + limit - 1;

    res.status(200).json({
      success: true,
      message: {
        data: dishes,
        count: total,
        starting,
        ending,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
