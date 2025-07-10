// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Firebase config with corrected storage bucket
const firebaseConfig = {
  apiKey: "AIzaSyAqrh-oeZOQ6RpOHT8uqUnKG2ks2X_oKTQ",
  authDomain: "mindmapme-7da22.firebaseapp.com",
  projectId: "mindmapme-7da22",
  storageBucket: "mindmapme-7da22.appspot.com", // ✅ Corrected here
  messagingSenderId: "66393292033",
  appId: "1:66393292033:web:fe9c3427ffefaac2346f00",
  measurementId: "G-Y4VKRNXXE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
