<template>
    <dialog :open="isOpen" class="modal">
      <div class="modal-box w-full max-w-2xl">
        <h4 class="text-center text-xl font-semibold">Departamento de Ciencias Jurídicas</h4>
        <figure class="mt-4">
            <img
              class="w-full h-96 object-cover rounded-lg"
              src="https://uls.edu.sv/sitioweb/images/2022/IMG_5547.JPG"
              alt="Imagen de la facultad"
            />
        </figure>
        <div class="modal-action mt-4 flex justify-center">
          <!-- Emite un evento para cerrar el modal cuando se hace clic -->
          <button class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
        </div>
      </div>
    </dialog>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Definir las propiedades del modal
  const props = defineProps({
    isOpen: Boolean,  // Estado para controlar la visibilidad
    evento: Object   // Información del evento
  });
  
  // Definir el evento que se va a emitir
  const emit = defineEmits(['update:isOpen']); // El nombre del evento es 'update:isOpen'
  
  const cerrarModal = () => {
    // Emitir el evento para actualizar el estado 'isOpen' en el componente padre
    emit('update:isOpen', false);
  };
  </script>
  