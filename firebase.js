// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4PDyskr5fVVXeVfxJUPo7wxCb4X_Nw-k",
  authDomain: "cteen-proyect-1f6bf.firebaseapp.com",
  projectId: "cteen-proyect-1f6bf",
  storageBucket: "cteen-proyect-1f6bf.appspot.com",
  messagingSenderId: "470425292444",
  appId: "1:470425292444:web:aaa1ec6c6d4f0190db6759"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };