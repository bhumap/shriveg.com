import admin from 'firebase-admin';
import serviceAccount from '@/config/@/config/shriveg-eb7c3-firebase-adminsdk-4utrd-b8462cb86e.json'; // Update this path with the actual path to your service account JSON file

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;