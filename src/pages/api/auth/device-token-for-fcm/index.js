import dbConnect from "@/config/dbConnect";
import { JWTVerify } from "@/helpers/jwt";
import userModel from "@/models/users";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "POST":
      try {

        var token = req.cookies.AccessToken || "";
        var userID = await JWTVerify(token);


        if (!userID) {
          return res.status(403).json({
            success: false,
            message: "You are not authorized!",
          });
        }

        // Find user by ID
        const data = await userModel.findByIdAndUpdate(userID,{$addToSet:{deviceTokens:req.body.token}},{new:true});


        if (!data) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Token Saved successfully",
        });


      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message || "Internal Server Error",
        });
      }

    default:
      return res.status(405).json({
        success: false,
        message: "Method not Allowed!",
      });
  }
}