// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDAZnkTv67uudknGUIWrvQzTpZ22h6bi4",
  authDomain: "sport-tracking-81f88.firebaseapp.com",
  projectId: "sport-tracking-81f88",
  storageBucket: "sport-tracking-81f88.firebasestorage.app",
  messagingSenderId: "187937704731",
  appId: "1:187937704731:web:e71b06b6542add8f4261be",
  measurementId: "G-ZBQ17FMYML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);