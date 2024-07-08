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

      // Find sender
      const sender = await UsersModel.findById(senderId);
      if (!sender) {
        return res.status(404).json({
          success: false,
          message: "Sender not found.",
        });
      }

      // Find delivery boys within 5 km radius
      const radius = 5000; // 5 km in meters
      const { coordinates } = sender.location;

      const latitude = sender.location.coordinates[1]; // Accesses latitude (index 1)
      const longitude = sender.location.coordinates[0];

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      const receivers = await UsersModel.find({
        userType: "Delivery_Boy",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: coordinates,
            },
            $maxDistance: radius,
          },
        },
      });

      if (!receivers || receivers.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No delivery boys found within 5 km.",
        });
      }

      const uniqueId = uuidv4(); // Generate a unique ID

      const messages = await Promise.all(
        receivers.map(async (receiver) => {
          const newMessage = await Message.create({
            sender: senderId,
            receiver: receiver._id,
            message,
            confirmedBy,
            UniqueId: uniqueId, // Assign the unique ID to each message
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

      // Update all messages with the given uniqueId
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
