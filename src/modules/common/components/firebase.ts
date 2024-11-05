// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Obtén la instancia de autenticación
const auth = getAuth(app);

// Exporta la instancia de autenticación
export { auth };