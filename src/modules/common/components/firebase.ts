// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Importar Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0_rwVbERbSQqvakowb3AXJoVcRIcJLKc",
    authDomain: "proyectofinal-f4641.firebaseapp.com",
    projectId: "proyectofinal-f4641",
    storageBucket: "proyectofinal-f4641.appspot.com",
    messagingSenderId: "52229665818",
    appId: "1:52229665818:web:be1b3ce53beb7b883f8da3",
    measurementId: "G-SDER4NJ4NM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Exporta las instancias que vas a usar en tu proyecto
export { auth, db };
