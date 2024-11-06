<template>
    <div class="container">
      <div class="card">
        <h2>Agregar Evento</h2>
        <form @submit.prevent="addEvent">
          <div>
            <label for="eventName">Nombre del Evento:</label>
            <input
              type="text"
              id="eventName"
              v-model="eventName"
              required
            />
          </div>
          <div>
            <label for="eventDescription">Descripción:</label>
            <textarea
              id="eventDescription"
              v-model="eventDescription"
              required
            ></textarea>
          </div>
          <div>
            <label for="eventCarrera">Carrera:</label>
            <input
              type="text"
              id="eventCarrera"
              v-model="eventCarrera"
              required
            />
          </div>
          <div>
            <label for="eventImage">Imagen del Evento:</label>
            <input
              type="file"
              id="eventImage"
              @change="handleImageUpload"
              accept="image/*"
              required
            />
          </div>
          <button type="submit">Agregar Evento</button>
        </form>
  
        <div v-if="eventAdded" class="success-message">
          Evento agregado exitosamente.
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '../common/components/firebase'; // Ajusta la ruta de acuerdo a la ubicación de tu archivo
  import { collection, addDoc } from 'firebase/firestore'; // Importar funciones de Firestore
  
  export default {
    data() {
      return {
        eventName: '',
        eventDescription: '',
        eventCarrera: '',
        eventImage: null, // Para almacenar la imagen
        eventAdded: false // Para mostrar mensaje de éxito
      };
    },
    methods: {
      handleImageUpload(event) {
        this.eventImage = event.target.files[0]; // Guardar la imagen seleccionada
      },
      async addEvent() {
        try {
          console.log("Intentando agregar el evento...");
          console.log("Datos del evento:", {
            nombre: this.eventName,
            descripcion: this.eventDescription,
            carrera: this.eventCarrera,
            imagen: this.eventImage ? this.eventImage.name : null // Agregar nombre de la imagen
          });
  
          // Guardar en Firestore
          const eventRef = await addDoc(collection(db, 'events'), {
            nombre: this.eventName,
            descripcion: this.eventDescription,
            carrera: this.eventCarrera,
            timestamp: new Date()
          });
  
          // Aquí podrías manejar la carga de la imagen a Firebase Storage si lo deseas.
          // Puedes usar el eventRef.id para relacionar la imagen con el evento en Firestore.
  
          console.log("Evento agregado exitosamente");
          this.eventAdded = true; // Mostrar mensaje de éxito
          this.eventName = '';
          this.eventDescription = '';
          this.eventCarrera = '';
          this.eventImage = null; // Resetear eventImage
        } catch (error) {
          console.error("Error al agregar evento:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Ocupa toda la altura de la ventana */
  }
  
  .card {
    background-color: rgb(15, 46, 223);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 400px; /* Ancho de la tarjeta */
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  form label {
    display: block;
    margin-bottom: 5px;
  }
  
  form input,
  form textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  form button {
    margin-top: 10px;
  }
  
  .success-message {
    margin-top: 15px;
    color: green;
    font-weight: bold;
  }
  </style>
  