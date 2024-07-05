// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAonfEjOZjwgmlLzcIZckloiqC0exKO8uw",
    authDomain: "shriveg-eb7c3.firebaseapp.com",
    projectId: "shriveg-eb7c3",
    storageBucket: "shriveg-eb7c3.appspot.com",
    messagingSenderId: "244333667106",
    appId: "1:244333667106:web:b6108f38ac49ff25677b7b",
    measurementId: "G-C9Z6MNLW92"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

let lastNotification = null;

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationBody = payload.notification.body;

  // Check if this notification is the same as the last one
  if (lastNotification === notificationTitle + notificationBody) {
    return;
  }

  const notificationOptions = {
    body: notificationBody,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);

  // Store this notification as the last notification
  lastNotification = notificationTitle + notificationBody;

  // Remove the notification after 5 seconds
  setTimeout(() => {
    self.registration.getNotifications().then((notifications) => {
      notifications.forEach((notification) => {
        notification.close();
      });
    });
  }, 3000);
});

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});