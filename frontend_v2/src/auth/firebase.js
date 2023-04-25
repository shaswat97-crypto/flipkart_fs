// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr1cyA7DEUiIzrcLd_ZSBry_z0rJ9FhSs",
  authDomain: "flipkart-21c73.firebaseapp.com",
  projectId: "flipkart-21c73",
  storageBucket: "flipkart-21c73.appspot.com",
  messagingSenderId: "299517453113",
  appId: "1:299517453113:web:54d3cd98e963dac025bee8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);  
export const auth = firebase.auth();