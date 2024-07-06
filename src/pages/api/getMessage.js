// pages/api/getMessage.js

import dbConnect from "@/config/dbConnect";
import Message from "@/models/messages";
import UsersModel from "@/models/users";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      const user = await UsersModel.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      const messages = await Message.find({
        $or: [{ sender: userId }, { receiver: userId }],
      });

      if (!messages || messages.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No messages found for this user.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Messages retrieved successfully!",
        data: messages,
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve messages.",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
