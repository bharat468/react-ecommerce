// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyAI0EOzH4-EDKtPUulM1RzMcckyB64IV24",
  authDomain: "e-commerce-b41a4.firebaseapp.com",
  projectId: "e-commerce-b41a4",
  storageBucket: "e-commerce-b41a4.firebasestorage.app",
  messagingSenderId: "84089326050",
  appId: "1:84089326050:web:d542606e12db59982491bb",
  measurementId: "G-0S270FFE26",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app)
export default app;
