// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj5I73dz3i0F1J3v7oh3zWiaxd8ugGV3g",
  authDomain: "nebulachatapp.firebaseapp.com",
  projectId: "nebulachatapp",
  storageBucket: "nebulachatapp.appspot.com",
  messagingSenderId: "741692584435",
  appId: "1:741692584435:web:f72018d3d15c97f9c5a286"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(); 
export const db = getFirestore();