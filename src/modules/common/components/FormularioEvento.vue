<template>
  <div v-if="showForm" class="fixed bottom-24 left-8 p-6 bg-white shadow-lg rounded-lg w-80">
    <!-- Campo para el título -->
    <input
      v-model="nuevoEvento.titulo"
      type="text"
      placeholder="Título del evento"
      class="input input-bordered w-full mb-4"
    />
    
    <!-- Campo para la imagen -->
    <input
      v-model="nuevoEvento.imagen"
      type="url"
      placeholder="Enlace de la imagen"
      class="input input-bordered w-full mb-4"
    />
    
    <!-- Campo para la descripción -->
    <textarea
      v-model="nuevoEvento.descripcion"
      placeholder="Descripción del evento"
      class="textarea textarea-bordered w-full mb-4"
    ></textarea>
    
    <!-- Campo para la fecha del evento en formato dd/mm/aaaa -->
    <input
      v-model="nuevoEvento.fecha"
      type="text"
      placeholder="DD/MM/AAAA"
      class="input input-bordered w-full mb-4"
      @input="validarFecha" 
    />

    <!-- Botón para guardar el evento -->
    <button @click="guardarEvento" class="btn btn-success bg-green-600 text-white w-full">Guardar Evento</button>

    <!-- Botón para eliminar el evento -->
    <button @click="eliminarEvento(nuevoEvento.id)" class="btn btn-danger bg-red-600 text-white w-full mt-2">
      Eliminar Evento
    </button>

    <!-- Botón para cancelar la edición -->
    <button @click="cancelarEdicion" class="btn btn-secondary bg-gray-600 text-white w-full mt-2">Cancelar</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

// Define las props que se pasan al componente
const props = defineProps({
  showForm: Boolean,
  nuevoEvento: Object,
  guardarEvento: Function,
  eliminarEvento: Function,
});

// Define el evento que va a emitir el componente hijo para cancelar la edición
const emit = defineEmits(['cancelarEdicion']);

const cancelarEdicion = () => {
  // Emite el evento para cerrar el formulario de edición
  emit('cancelarEdicion');
};

// Función para validar el formato de fecha dd/mm/aaaa
const validarFecha = () => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (regex.test(nuevoEvento.fecha)) {
    // Si el formato es correcto, se puede procesar la fecha
    const [_, dia, mes, anio] = nuevoEvento.fecha.match(regex);
    // Aquí puedes procesar la fecha si es necesario
    console.log(`Fecha válida: ${dia}/${mes}/${anio}`);
  } else {
    // Si el formato no es válido, muestra un mensaje de error o realiza alguna acción
    console.log('Formato de fecha no válido');
  }
};
</script>
