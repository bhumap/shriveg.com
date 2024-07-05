import dbConnect from "@/config/dbConnect";
import { JWTVerify } from "@/helpers/jwt";
import UserModel from "@/models/users";

export default async function handler(req, res) {

  
  await dbConnect();

  switch (req.method) {
    case "PUT":
      try {


        var token = req.cookies.AccessToken || "";
        var userID = await JWTVerify(token) || req.query.id

        const updateUser = await UserModel.findByIdAndUpdate(
          userID,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );

        if (!updateUser) {
          return res.status(400).json({
            success: false,
            message: "User Not Found!",
          });
        }

        return res.status(200).json({
          success: true,
          message: updateUser,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Something went wrong with the update!",
          error: error.message,
        });
      }

      break;
    default:
      return;
  }
}
