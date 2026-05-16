import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2P5b09lpWcsi3Ak0EcsodK3NphrGYjaM",
  authDomain: "dice-73ad0.firebaseapp.com",
  projectId: "dice-73ad0",
  storageBucket: "dice-73ad0.firebasestorage.app",
  messagingSenderId: "16689957240",
  appId: "1:16689957240:web:07feb77af71c171c83208d",
  measurementId: "G-KTPX1F354W"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});