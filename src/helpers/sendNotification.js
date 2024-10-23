const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('@/config/shriveg-eb7c3-firebase-adminsdk-4utrd-b8462cb86e.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Add other configuration options as needed
  });
}

// Function to send push notification
export default async function sendNotification(deviceTokens, title, body) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    tokens: deviceTokens,
    webpush: {
      notification: {
        icon: 'https://shriveg.com/images/logo.svg',
        image: 'https://shriveg.com/images/logo.svg',
        click_action:`${process.env.DOMAIN}/portal/orders`
      },
    },
    
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    return response
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}
