import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh_buLXELfsBlCSiiUX6oj9prr0ojsKFY",
  authDomain: "dars-483a4.firebaseapp.com",
  projectId: "dars-483a4",
  storageBucket: "dars-483a4.firebasestorage.app",
  messagingSenderId: "177814689086",
  appId: "1:177814689086:web:847e4fbbc80ede0a39486f",
  measurementId: "G-9D0Z3SJBNV",
  databaseUrl: "https://dars-483a4-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
