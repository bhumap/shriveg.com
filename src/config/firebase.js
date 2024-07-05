import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAonfEjOZjwgmlLzcIZckloiqC0exKO8uw",
  authDomain: "shriveg-eb7c3.firebaseapp.com",
  projectId: "shriveg-eb7c3",
  storageBucket: "shriveg-eb7c3.appspot.com",
  messagingSenderId: "244333667106",
  appId: "1:244333667106:web:b6108f38ac49ff25677b7b",
  measurementId: "G-C9Z6MNLW92"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);