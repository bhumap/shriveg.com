import dbConnect from "@/config/dbConnect";
import Notification from "@/models/notifications";
import { JWTVerify } from "@/helpers/jwt";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  try {
    var token = req.cookies.AccessToken || "";
    var userID = await JWTVerify(token);

    if (!userID) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to access the notifications!",
      });
      return;
    }

    switch (method) {

      case "GET":
        try {


          var match = {
            user: new mongoose.Types.ObjectId(userID),
            read:false
          }

          if(req.query.read){
            match.read = req.query.read
          }

          const notifications = await Notification.find(match);
          res.status(200).json({ success: true, message: notifications });

        } catch (error) {
          res.status(400).json({ success: false,message:error.message });
        }
        break;
      case "POST":
        try {
          const notification = await Notification.create({
            ...req.body,
            user: new mongoose.Types.ObjectId(userID),
          });
          res.status(201).json({ success: true, data: notification });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(405).json({ success: false, message: "Method Not Allowed" });
        break;
    }
  } catch (error) {}
}
