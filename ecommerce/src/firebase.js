// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFwe_s3saUye1GBeKxj6oYgoE0YqsUGSE",
  authDomain: "ecommerce-login-1f767.firebaseapp.com",
  projectId: "ecommerce-login-1f767",
  storageBucket: "ecommerce-login-1f767.appspot.com",
  messagingSenderId: "552943080562",
  appId: "1:552943080562:web:0022ffc806bd5b240b1eeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;