// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUe9bjJim85kpgD2BfPEWPNBY38_s0lvc",
  authDomain: "netflixgpt-a86c0.firebaseapp.com",
  projectId: "netflixgpt-a86c0",
  storageBucket: "netflixgpt-a86c0.appspot.com",
  messagingSenderId: "211174492923",
  appId: "1:211174492923:web:03603cf9425ed876fb3e5e",
  measurementId: "G-159PY8MJ5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth=getAuth();