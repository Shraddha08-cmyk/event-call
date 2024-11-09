import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcJMRDbDDefNm9hsSwncqVKYcO-pQuBHc",
  authDomain: "event-call.firebaseapp.com",
  projectId: "event-call",
  storageBucket: "event-call.appspot.com",
  messagingSenderId: "510057967555",
  appId: "1:510057967555:web:0bc4aa5a25fead60ded776",
  measurementId: "G-6FK5Q767XS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, db, storage };
