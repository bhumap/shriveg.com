import dbConnect from '@/config/dbConnect';
import Message from '@/models/messages';
import UsersModel from '@/models/users';
import { v4 as uuidv4 } from 'uuid';
import { calculateDistance } from '@/config/distanceCalculator';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { senderId, message, confirmedBy, address_Id, user_ID, order_Id } = req.body;

      // Find sender
      const sender = await UsersModel.findById(senderId);
      if (!sender) {
        return res.status(404).json({
          success: false,
          message: 'Sender not found.',
        });
      }

      const { coordinates } = sender.location;
      if (!coordinates || coordinates.length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Sender location coordinates are invalid.',
        });
      }

      const latitude = coordinates[1];
      const longitude = coordinates[0];

      const allReceivers = await UsersModel.find({ userType: 'Delivery_Boy' });

      if (!allReceivers || allReceivers.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No delivery boys found.',
        });
      }

      const receivers = allReceivers.filter(receiver => {
        const { coordinates: receiverCoordinates } = receiver.location;
        if (!receiverCoordinates || receiverCoordinates.length < 2) {
          console.warn(`Invalid location for receiver: ${receiver._id}`);
          return false;
        }
        const receiverLatitude = receiverCoordinates[1];
        const receiverLongitude = receiverCoordinates[0];
        const distance = calculateDistance(
          { lat: latitude, lon: longitude },
          { lat: receiverLatitude, lon: receiverLongitude }
        );
        return distance <= 3; // Distance in kilometers
      });

      if (receivers.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No delivery boys within 3km radius.',
        });
      }

      const uniqueId = uuidv4(); // Generate a unique ID

      const messages = await Promise.all(
        receivers.map(async (receiver) => {
          const newMessage = await Message.create({
            sender: senderId,
            receiver: receiver._id,
            message,
            address_Id,
            user_ID,
            order_Id,
            confirmedBy: confirmedBy,
            UniqueId: uniqueId, // Assign the unique ID to each message
          });
          return newMessage;
        })
      );

      res.status(201).json({
        success: true,
        message: 'Messages sent successfully!',
        data: messages,
      });

    } catch (error) {
      console.error('Error sending messages:', error);
      res.status(500).json({
        success: false,
        message: 'Messages could not be sent.',
      });
    }
  } else if (req.method === 'PUT') {
    try {
      const { UniqueId, confirmedBy } = req.body;

      if (!UniqueId) {
        return res.status(400).json({
          success: false,
          message: 'Unique ID is required for confirmation.',
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
          message: 'Message not found.',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Message confirmation updated successfully!',
        data: updatedMessage,
      });

    } catch (error) {
      console.error('Error updating message confirmation:', error);
      res.status(500).json({
        success: false,
        message: 'Message confirmation could not be updated.',
      });
    }
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}