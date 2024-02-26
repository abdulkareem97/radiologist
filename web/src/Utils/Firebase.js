// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOGgYQIglZ6KrfQrNnFJZv4T5_1KWNAqU",
  authDomain: "whale-bd37d.firebaseapp.com",
  projectId: "whale-bd37d",
  storageBucket: "whale-bd37d.appspot.com",
  messagingSenderId: "1087127866599",
  appId: "1:1087127866599:web:c74b4f3a3074e33f51a642",
  measurementId: "G-JC1G8150YS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export {storage,auth}
