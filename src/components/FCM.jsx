'use client'
import {useContext, useEffect} from 'react'
// firbase push notifications
import { getMessaging,onMessage } from "firebase/messaging";
import useFcmToken from "@/hooks/useFcmToken";
import { firebaseApp } from "@/config/firebase";
import { AuthContext } from '@/context/AuthContext';

const FCM = () => {

    const { fcmToken,notificationPermissionStatus } = useFcmToken();
    const {notifications} = useContext(AuthContext)

  
    useEffect(() => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) => {
          // console.log('Foreground push notification received:', payload);

          notifications.refetch()


          // const notificationTitle = payload.notification.title;
          // const notificationOptions = {
          //   body: payload.notification.body,
          //   icon: './images/logo.svg',
          // };
          // new Notification(notificationTitle, notificationOptions);
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event
        };
      }
    }, []);

  return (
    <div></div>
  )
}

export default FCM