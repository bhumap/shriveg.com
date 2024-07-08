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

      const R = 6371; // Radius of the Earth in km
      const maxDistance = 3; // Maximum distance in km

      // Query delivery boys within 3km radius of sender
      const deliveryBoys = await UsersModel.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [sender.location.lng, sender.location.lat] },
            distanceField: "dist.calculated",
            maxDistance: maxDistance * 1000,
            spherical: true,
            query: { userType: "Delivery_Boy", isActive: true },
          },
        },
      ]);

      if (!deliveryBoys || deliveryBoys.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No delivery boys found within 3km radius.",
        });
      }

      const uniqueId = uuidv4();

      // Create messages for each delivery boy
      const messages = await Promise.all(
        deliveryBoys.map(async (receiver) => {
          const newMessage = await Message.create({
            sender: senderId,
            receiver: receiver._id,
            message,
            confirmedBy,
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
      console.error("Error sending messages:", error);
      res.status(500).json({
        success: false,
        message: "Messages could not be sent. Please try again.",
        error: error.message, // Include error message for debugging
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

      // Update message confirmation status
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
      console.error("Error updating message confirmation:", error);
      res.status(500).json({
        success: false,
        message: "Message confirmation could not be updated. Please try again.",
        error: error.message, // Include error message for debugging
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
