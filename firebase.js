// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwdDdW4rclS90sC8igGOZT5dl0aI5HCyM",
  authDomain: "todo-list-aea66.firebaseapp.com",
  databaseURL: "https://todo-list-aea66-default-rtdb.firebaseio.com",
  projectId: "todo-list-aea66",
  storageBucket: "todo-list-aea66.appspot.com",
  messagingSenderId: "330040594572",
  appId: "1:330040594572:web:65c2433d9773135435aba9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };


