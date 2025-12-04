// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTKTPDY_a4N2TplBeFXAeCDxKXr1a_Wu8",
  authDomain: "osel-27df6.firebaseapp.com",
  projectId: "osel-27df6",
  storageBucket: "osel-27df6.firebasestorage.app",
  messagingSenderId: "348398884166",
  appId: "1:348398884166:web:c3675b2464017e75d94147",
  measurementId: "G-EEJ9Q1YR23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);