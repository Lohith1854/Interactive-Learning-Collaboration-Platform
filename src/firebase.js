// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoVBmwNVD0PY7yNGAJ8Wv6B94IhIyvXDA",
  authDomain: "learning-platform-5ce39.firebaseapp.com",
  projectId: "learning-platform-5ce39",
  storageBucket: "learning-platform-5ce39.firebasestorage.app",
  messagingSenderId: "157930464109",
  appId: "1:157930464109:web:7efb79fd7e209e00edb064",
  measurementId: "G-GL4T2JSKHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services we will use
export const auth = getAuth(app);
export const db = getFirestore(app);
