  import dbConnect from '@/config/dbConnect';
  import Message from '@/models/messages';
  import UsersModel from '@/models/users';
  import { v4 as uuidv4 } from 'uuid';

  export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
      try {
        const { senderId, message, confirmedBy } = req.body;

        // Ensure senderId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(senderId)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid senderId.',
          });
        }

        // Find sender
        const sender = await UsersModel.findById(senderId);
        if (!sender) {
          return res.status(404).json({
            success: false,
            message: 'Sender not found.',
          });
        }

        // Find delivery boys within maxDistance radius of sender's location
        const maxDistance = 3; // in km
        const deliveryBoys = await UsersModel.aggregate([
          {
            $geoNear: {
              near: {
                type: 'Point',
                coordinates: [sender.location.coordinates[0], sender.location.coordinates[1]],  // Ensure correct access
              },
              distanceField: 'dist.calculated',
              maxDistance: maxDistance * 1000,
              spherical: true,
              query: { userType: 'Delivery_Boy', isActive: true },
            },
          },
        ]);

        if (!deliveryBoys || deliveryBoys.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'No delivery boys found within 3km radius.',
          });
        }

        // Generate a unique ID for messages
        const uniqueId = uuidv4();

        // Create messages for each delivery boy found
        const messages = await Promise.all(
          deliveryBoys.map(async (receiver) => {
            try {
              const newMessage = await Message.create({
                sender: senderId,
                receiver: receiver._id,
                message,
                confirmedBy,
                UniqueId: uniqueId,
              });
              return newMessage;
            } catch (error) {
              console.error('Error creating message:', error);
              throw new Error('Message creation failed.');
            }
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

        // Validate UniqueId
        if (!UniqueId) {
          return res.status(400).json({
            success: false,
            message: 'Unique ID is required for confirmation.',
          });
        }

        // Update messages with the given UniqueId
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
