<template>
    <div v-if="showForm" class="fixed bottom-24 left-8 p-6 bg-white shadow-lg rounded-lg w-80">
      <input
        v-model="nuevoEvento.titulo"
        type="text"
        placeholder="Título del evento"
        class="input input-bordered w-full mb-4"
      />
      <input
        v-model="nuevoEvento.imagen"
        type="url"
        placeholder="Enlace de la imagen"
        class="input input-bordered w-full mb-4"
      />
      <textarea
        v-model="nuevoEvento.descripcion"
        placeholder="Descripción del evento"
        class="textarea textarea-bordered w-full mb-4"
      ></textarea>
      <button @click="guardarEvento" class="btn btn-success bg-green-600 text-white w-full">Guardar Evento</button>
      <button @click="eliminarEvento(nuevoEvento.id)" class="btn btn-danger bg-red-600 text-white w-full mt-2">
        Eliminar Evento
      </button>
      <button @click="cancelarEdicion" class="btn btn-secondary bg-gray-600 text-white w-full mt-2">Cancelar</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Define las props que se pasan al componente
  const props = defineProps({
    showForm: Boolean,
    nuevoEvento: Object,
    guardarEvento: Function,
    eliminarEvento: Function
  });
  
  // Define el evento que va a emitir el componente hijo para cancelar la edición
  const emit = defineEmits(['cancelarEdicion']);
  
  const cancelarEdicion = () => {
    // Emite el evento para cerrar el formulario de edición
    emit('cancelarEdicion');
  };
  </script>
  