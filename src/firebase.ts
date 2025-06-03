// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ98vmeu4qLfaIEZI2ynA_mMXj6jQ_ncc",
  authDomain: "focushoney-b54d5.firebaseapp.com",
  projectId: "focushoney-b54d5",
  storageBucket: "focushoney-b54d5.firebasestorage.app",
  messagingSenderId: "628679421999",
  appId: "1:628679421999:web:17a2b7af6e2cd5cb3a96da",
  measurementId: "G-MQEPF7P6ST",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app); // ✅ Add this if missing

export { auth, db }; // ✅ Make sure this line exists
