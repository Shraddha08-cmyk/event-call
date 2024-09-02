// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth from Firebase
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcJMRDbDDefNm9hsSwncqVKYcO-pQuBHc",
  authDomain: "event-call.firebaseapp.com",
  projectId: "event-call",
  storageBucket: "event-call.appspot.com",
  messagingSenderId: "510057967555",
  appId: "1:510057967555:web:0bc4aa5a25fead60ded776",
  measurementId: "G-6FK5Q767XS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
// Optional: Initialize Analytics

export { auth }; // Export the initialized auth object
export { db };
