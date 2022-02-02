import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyByiZtpsn4M0fYOSH_LOE4JsMdMQZbcjfc",
  authDomain: "moa-web-mvp.firebaseapp.com",
  projectId: "moa-web-mvp",
  storageBucket: "moa-web-mvp.appspot.com",
  messagingSenderId: "1018315283062",
  appId: "1:1018315283062:web:e32cdd0a2f11eec6f71d57",
  measurementId: "G-9P4K8TJGW2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();