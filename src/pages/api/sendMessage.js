// pages/api/sendNotification.js

import admin from 'firebase-admin';
import dbConnect from '@/config/dbConnect';
import Message from '@/models/messages';
import UsersModel from '@/models/users';
import { v4 as uuidv4 } from 'uuid';
import { calculateDistance } from '@/config/distanceCalculator';

// Initialize Firebase Admin SDK
const serviceAccount = require('@/config/shriveg-eb7c3-firebase-adminsdk-4utrd-b8462cb86e.json'); // Replace with your service account key path

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Add other configuration options as needed
  });
}

// Connect to MongoDB
dbConnect(); // Example function to connect MongoDB (adjust as per your setup)

// API Route Handler to send push notification for messages
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { senderId, message, confirmedBy } = req.body;

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

      // Send notifications to all receivers
      const tokens = receivers.map(receiver => receiver.fcmToken);

      const messagePayload = {
        notification: {
          title: 'New Message',
          body: message,
        },
        data: {
          senderId: senderId.toString(),
          message: message,
        },
      };

      const response = await admin.messaging().sendToDevice(tokens, messagePayload);
      console.log('Push notification sent successfully:', response);

      // Save messages to MongoDB
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
        message: 'Messages sent successfully!',
        data: messages,
      });

    } catch (error) {
      console.error('Error sending messages:', error);
      res.status(500).json({
        success: false,
        message: 'Messages could not be sent.',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
