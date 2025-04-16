// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlcc_pJC8DbO9F_gOj-_0eEs5uR901p_A",
    authDomain: "manto-sagrado-a09e8.firebaseapp.com",
    projectId: "manto-sagrado-a09e8",
    storageBucket: "manto-sagrado-a09e8.firebasestorage.app",
    messagingSenderId: "62887309685",
    appId: "1:62887309685:web:ad005611f3c9ef3817e33c",
    measurementId: "G-7BBL6907E8"
};

let auth: Auth;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
auth = getAuth(app);
export { auth, db };


/* const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}; */