import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBt6ZpwC4occUTN2X5vpITjaaNWx7GdRxc",
    authDomain: "eivms-a1be0.firebaseapp.com",
    projectId: "eivms-a1be0",
    storageBucket: "eivms-a1be0.firebasestorage.app",
    messagingSenderId: "792709310264",
    appId: "1:792709310264:web:6b937259b0373eb99503cd",
    measurementId: "G-9TW64X7QE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ Export auth

