import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAFwe3gGl2sgZEVTnlsIqkq2-HVEh0sTxo",
    authDomain: "mobilnaaplikacija-2b71f.firebaseapp.com",
    projectId: "mobilnaaplikacija-2b71f",
    storageBucket: "mobilnaaplikacija-2b71f.firebasestorage.app",
    messagingSenderId: "947951855657",
    appId: "1:947951855657:web:17ab4116f3d9285e541438"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };