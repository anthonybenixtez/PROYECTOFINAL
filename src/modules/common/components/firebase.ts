// Importa Firestore
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore';

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

// Suscripción para la persistencia de la sesión de usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario aún autenticado:", user);
  } else {
    console.log("No hay usuario autenticado");
  }
});

// Función para agregar un evento a Firestore
async function agregarEventoFirestore(evento: { titulo: string, imagen: string, descripcion: string, fecha: string }) {
  try {
    const docRef = await addDoc(collection(db, "eventos"), { 
      ...evento, 
      nuevo: true // Marca como evento nuevo
    });
    console.log("Evento agregado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error añadiendo documento: ", e);
  }
}

// Escuchar eventos en tiempo real
export const escucharEventosFirestore = (callback: (eventos: any[]) => void) => {
  const eventosRef = collection(db, 'eventos');
  return onSnapshot(eventosRef, (snapshot) => {
    const eventos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(eventos);
  });
};

// Función para obtener todos los eventos desde Firestore
async function obtenerEventosFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "eventos"));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (e) {
    console.error("Error obteniendo documentos: ", e);
    return [];
  }
}

// Función para obtener eventos de Firestore por fecha
export const obtenerEventosPorFecha = async (fecha: string) => {
  try {
    const eventosRef = collection(db, "eventos");
    const q = query(eventosRef, where("fecha", "==", fecha)); // Buscar eventos con la fecha dada
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error obteniendo eventos por fecha: ", e);
    return [];
  }
};

// Función para actualizar un evento en Firestore// Función para actualizar un evento en Firestore
async function actualizarEventoFirestore(evento: { id: string, titulo: string, imagen: string, descripcion: string, categoria?: string, fecha?: string, nuevo?: boolean }) {
  try {
    const eventoRef = doc(db, "eventos", evento.id); // Referencia al documento del evento
    const updateData: any = {
      titulo: evento.titulo,
      imagen: evento.imagen,
      descripcion: evento.descripcion,
    };

    if (evento.categoria) updateData.categoria = evento.categoria;
    if (evento.fecha) updateData.fecha = evento.fecha;
    if (evento.nuevo !== undefined) updateData.nuevo = evento.nuevo; // Agregar o actualizar el campo 'nuevo'

    await updateDoc(eventoRef, updateData);
    console.log("Evento actualizado con ID: ", evento.id);
  } catch (e) {
    console.error("Error actualizando documento: ", e);
  }
}


// Función para eliminar un evento en Firestore
async function eliminarEventoFirestore(id: string) {
  try {
    const eventoRef = doc(db, "eventos", id); // Referencia al documento del evento
    await deleteDoc(eventoRef);
    console.log("Evento eliminado con ID: ", id);
  } catch (e) {
    console.error("Error eliminando documento: ", e);
  }
}

// Exporta la autenticación, Firestore y las funciones
export { auth, db, agregarEventoFirestore, obtenerEventosFirestore, actualizarEventoFirestore, eliminarEventoFirestore };
