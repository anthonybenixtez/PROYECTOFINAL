// Importa Firestore
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC0_rwVbERbSQqvakowb3AXJoVcRIcJLKc",
  authDomain: "proyectofinal-f4641.firebaseapp.com",
  projectId: "proyectofinal-f4641",
  storageBucket: "proyectofinal-f4641.appspot.com",
  messagingSenderId: "52229665818",
  appId: "1:52229665818:web:be1b3ce53beb7b883f8da3",
  measurementId: "G-SDER4NJ4NM"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);  // Instancia de Firestore



// Exporta la autenticación y Firestore
export { auth, db };
