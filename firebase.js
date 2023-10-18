// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8LH4vHBFwigJBMfmIuisAj4VIC2_WxO4",
  authDomain: "cteen-proyect.firebaseapp.com",
  projectId: "cteen-proyect",
  storageBucket: "cteen-proyect.appspot.com",
  messagingSenderId: "188647484386",
  appId: "1:188647484386:web:3a97cf5276007764ac67bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };