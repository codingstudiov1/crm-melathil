// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe0uDyTy8p_giL722H9r4DPEQaOMRnxnI",
  authDomain: "melathil-crm.firebaseapp.com",
  projectId: "melathil-crm",
  storageBucket: "melathil-crm.appspot.com",
  messagingSenderId: "1031827995592",
  appId: "1:1031827995592:web:896840ff5d7321ae859efd",
  measurementId: "G-32DKD72LLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);