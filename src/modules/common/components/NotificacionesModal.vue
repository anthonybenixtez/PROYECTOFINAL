<template>
  <div class="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="modal-box bg-white rounded-lg shadow-lg p-6 relative animate-fade-in">
      <!-- Título del modal -->
      <h3 class="font-bold text-xl text-gray-800 mb-4">Notificaciones</h3>

      <!-- Lista de notificaciones -->
      <ul class="space-y-4">
        <li 
          v-for="(evento, index) in eventos" 
          :key="index" 
          :class="{'visto': !evento.nuevo}" 
          class="py-2 border-b"
        >
          <p><strong>Título:</strong> {{ evento.titulo }}</p>
          <p><strong>Descripción:</strong> {{ evento.descripcion }}</p>
        </li>

      </ul>

      <!-- Botón para cerrar -->
      <div class="modal-action mt-6">
        <button 
          class="btn btn-primary w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg shadow-md py-2"
          @click="$emit('cerrar')"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PropType } from 'vue';

// Props
const eventos = defineProps({
  eventos: {
    type: Array as PropType<Array<{ titulo: string; descripcion: string }>>,
    required: true,
  },
});
</script>

<style scoped>
/* Fondo con desenfoque */
.modal-open {
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
}

/* Animación al abrir el modal */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

/* Notificaciones con hover dinámico */
.notification-item {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.notification-item:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transform: scale(1.03);
}

/* Estilo del ícono */
.icon {
  font-size: 24px;
}
</style>
