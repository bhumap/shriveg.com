import { useContext, useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseApp } from '../config/firebase';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';

const useFcmToken = () => {
  const [token, setToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

  var contextData = useContext(AuthContext)

  const saveTokenInDbWithUserData = async (token) =>{
    try {

      if(contextData?.user){
        var {data} = await axios.post('/api/auth/device-token-for-fcm',{token})
        console.log(data)
      }else{
        console.log("User not found to save token for fcm :",token)
      }
      
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && contextData?.user) {
          const messaging = getMessaging(firebaseApp);

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Check if permission is granted before retrieving the token
          if (permission === 'granted') {
            const currentToken = await getToken(messaging, {
              vapidKey: 'BLvjPVclQNqcpAetfIFIWQTDwckSe1n9J9Cx8A2TxYGK8euE0wvs8Rjg-nxsNjvkDrLeXxDF2l5k6nRPuVNZRmE',
            });
            if (currentToken) {
              setToken(currentToken);
              
              // Store Token in DB as well
              saveTokenInDbWithUserData(currentToken)


            } else {
              console.log(
                'No registration token available. Request permission to generate one.'
              );
            }
          }else{
            if(contextData?.user?.userType == "Chef"){
              console.log("Please turn on your notifications to say updated with new order received from shriveg!")
            }else if(contextData?.user?.userType == "Customer"){
              console.log("Please turn on your notifications to say updated with your placed order status!")
            }
          }
        }
      } catch (error) {
        console.log('An error occurred while retrieving token:', error);
      }
    };

    retrieveToken();
  }, [contextData]);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
