// pages/api/sendMessage.js

import dbConnect from "@/config/dbConnect";
import Message from "@/models/messages";
import UsersModel from "@/models/users";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { senderId, message, confirmedBy } = req.body;

      // Sender ko find karo
      const sender = await UsersModel.findById(senderId);
      if (!sender) {
        return res.status(404).json({
          success: false,
          message: "Sender not found.",
        });
      }

      const { lat: senderLat, lng: senderLng } = sender.location;

      // 3 km radius ke andar delivery boys ko find karo
      const receivers = await UsersModel.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [senderLng, senderLat] },
            distanceField: "dist.calculated",
            maxDistance: 3000, // 3 km
            spherical: true,
            query: { userType: "Delivery_Boy" },
          },
        },
      ]);

      if (!receivers || receivers.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No delivery boys found within 3 km.",
        });
      }

      const uniqueId = uuidv4();

      const messages = await Promise.all(
        receivers.map(async (receiver) => {
          const newMessage = await Message.create({
            sender: senderId,
            receiver: receiver._id,
            message,
            confirmedBy: confirmedBy,
            UniqueId: uniqueId,
          });
          return newMessage;
        })
      );

      res.status(201).json({
        success: true,
        message: "Messages sent successfully!",
        data: messages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Messages could not be sent.",
      });
    }
  } else if (req.method === "PUT") {
    try {
      const { UniqueId, confirmedBy } = req.body;

      if (!UniqueId) {
        return res.status(400).json({
          success: false,
          message: "Unique ID is required for confirmation.",
        });
      }

      const updatedMessage = await Message.updateMany(
        { UniqueId },
        { confirmed: true, confirmedBy },
        { new: true }
      );

      if (!updatedMessage) {
        return res.status(404).json({
          success: false,
          message: "Message not found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Message confirmation updated successfully!",
        data: updatedMessage,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Message confirmation could not be updated.",
      });
    }
  } else {
    res.setHeader("Allow", ["POST", "PUT"]);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
