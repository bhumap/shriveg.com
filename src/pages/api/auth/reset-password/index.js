import dbConnect from "@/config/dbConnect";
import { JWTVerify } from "@/helpers/jwt";
import userModel from "@/models/users";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();

  var token = req.cookies.AccessToken || "";
  var userID = await JWTVerify(token)

  switch (req.method) {
    case "PUT":
      try {
        const { confirmPassword, password } = req.body;

        // Validate incoming data
        if (confirmPassword !== password) {
          return res.status(400).json({
            success: false,
            message: "Password and Confirm Password Must be same!",
          });
        }

        // Find user by ID
        const foundUser = await userModel.findById(userID);

        if (!foundUser) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        // Hash and update the new password
        const hashedNewPassword = await bcrypt.hash(password, 10);
        foundUser.password = hashedNewPassword;
        await foundUser.save();

        return res.status(200).json({
          success: true,
          message: "Password Reset successfully!",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error" || error.message,
        });
      }

    default:
      return res.status(405).json({
        success: false,
        message: "Method not Allowed!",
      });
  }
}
