
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyB4PDyskr5fVVXeVfxJUPo7wxCb4X_Nw-k",
  authDomain: "cteen-proyect-1f6bf.firebaseapp.com",
  projectId: "cteen-proyect-1f6bf",
  storageBucket: "cteen-proyect-1f6bf.appspot.com",
  messagingSenderId: "470425292444",
  appId: "1:470425292444:web:aaa1ec6c6d4f0190db6759"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)


export { app, db, auth, storage };