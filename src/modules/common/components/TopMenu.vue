<template>
  <div class="navbar bg-blue-600 text-white shadow-md">
    <!-- Navbar Start -->
    <div class="navbar-start">
      <router-link to="/home" class="action-button">
        <button class="w-10 h-10 flex items-center justify-center">
          <i class="fa-solid fa-house text-2xl"></i>
        </button>
      </router-link>
    </div>

    <!-- Navbar Center -->
    <div class="navbar-center">
      <a class="btn btn-ghost text-xl font-semibold text-white">Eventos ULS</a>
    </div>

    <!-- Navbar End -->
    <div class="navbar-end space-x-3">
      <!-- Notification Button -->
      <button
        class="btn btn-ghost btn-circle text-white w-10 h-10 flex items-center justify-center"
        @click="abrirNotificaciones"
      >
        <div class="indicator">
          <i class="fas fa-bell text-2xl"></i>
          <span
            v-if="contadorNuevos > 0"
            class="badge badge-xs badge-primary indicator-item"
          >
            {{ contadorNuevos }}
          </span>
        </div>
      </button>
    </div>
  </div>

  <!-- Modal de Notificaciones -->
  <div v-if="mostrarNotificaciones" class="modal modal-open notificaciones-modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Notificaciones</h3>
      <ul>
        <li
          v-for="(evento, index) in eventos"
          :key="evento.id"
          :class="{'visto': !evento.nuevo, 'eliminado': evento.eliminado}"
          class="py-2 border-b flex justify-between items-center"
        >
          <!-- Campana al principio -->
          <div class="flex items-center gap-2">
            <i v-if="evento.nuevo" class="fas fa-bell text-yellow-500 text-lg"></i>
            <i v-else class="fas fa-check-double text-gray-500 text-lg"></i>
          </div>

          <!-- Título, descripción y carrera en horizontal -->
          <div class="flex-grow flex justify-between gap-4 items-center">
            <div class="flex flex-col">
              <p class="text-sm font-semibold">{{ evento.titulo }}</p>
              <p class="text-xs">{{ evento.descripcion }}</p>
            </div>
            <p class="text-xs text-gray-500">{{ evento.categoria }}</p>
          </div>

          <!-- Opciones al final -->
          <div class="flex items-center gap-2">
            <input 
              type="checkbox" 
              v-model="eventoSeleccionado" 
              :value="evento.id" 
              class="checkbox"
            />
            <button 
              v-if="!evento.eliminado"
              @click="eliminarNotificacion(evento)"
              class="text-red-500 hover:text-red-700 text-lg"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </li>
      </ul>
      <div class="modal-action">
        <button class="btn btn-red" @click="eliminarSeleccionados">Eliminar seleccionados</button>
        <button class="btn" @click="cerrarNotificaciones">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { escucharEventosFirestore, actualizarEventoFirestore } from '@/modules/common/components/firebase';

const eventos = ref([]);
const contadorNuevos = ref(0);
const mostrarNotificaciones = ref(false);
const eventoSeleccionado = ref([]); // Lista de IDs de eventos seleccionados
let unsubscribe = null;

// Escuchar eventos en tiempo real
const escucharEventos = () => {
  unsubscribe = escucharEventosFirestore((nuevosEventos) => {
    eventos.value = nuevosEventos.filter(evento => !evento.eliminado);
    contadorNuevos.value = nuevosEventos.filter(evento => evento.nuevo && !evento.eliminado).length;
  });
};

// Abrir modal de notificaciones
const abrirNotificaciones = () => {
  mostrarNotificaciones.value = true;
  eventoSeleccionado.value = []; // Reseteamos la selección al abrir el modal
};

// Cerrar modal y actualizar eventos
const cerrarNotificaciones = async () => {
  mostrarNotificaciones.value = false;
  const eventosNuevos = eventos.value.filter(evento => !evento.nuevo);
  await Promise.all(
    eventosNuevos.map(evento =>
      actualizarEventoFirestore({ ...evento, nuevo: false })
    )
  );
  eventos.value = eventos.value.filter(evento => !evento.eliminado);
  contadorNuevos.value = eventos.value.filter(evento => evento.nuevo && !evento.eliminado).length;
};

// Eliminar una notificación individualmente (basurero)
const eliminarNotificacion = async (evento) => {
  try {
    await actualizarEventoFirestore({ ...evento, eliminado: true });
    evento.eliminado = true;
    contadorNuevos.value = eventos.value.filter(evento => evento.nuevo && !evento.eliminado).length;
  } catch (error) {
    console.error('Error al eliminar la notificación:', error);
  }
};

// Eliminar notificaciones seleccionadas (checkbox)
const eliminarSeleccionados = async () => {
  const eventosSeleccionados = eventos.value.filter(evento => eventoSeleccionado.value.includes(evento.id));
  try {
    await Promise.all(
      eventosSeleccionados.map(evento => actualizarEventoFirestore({ ...evento, eliminado: true }))
    );
    eventosSeleccionados.forEach(evento => evento.eliminado = true);
    contadorNuevos.value = eventos.value.filter(evento => evento.nuevo && !evento.eliminado).length;
    eventoSeleccionado.value = []; // Limpiar la selección después de eliminar
  } catch (error) {
    console.error('Error al eliminar las notificaciones seleccionadas:', error);
  }
};

// Montar y desmontar
onMounted(() => {
  escucharEventos();
});
onBeforeUnmount(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<style scoped>
/* Estilos generales para el modal */
.notificaciones-modal .modal-box {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  width: 50%;
  max-width: 1000px;
  padding: 20px;
  animation: modalIn 0.5s ease-in-out;
}

/* Título del modal */
.notificaciones-modal h3 {
  color: #3b82f6;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Lista de notificaciones */
.notificaciones-modal ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notificaciones-modal ul li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #eff6ff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: fadeIn 0.3s ease-in-out;
}

/* Efecto hover en las notificaciones */
.notificaciones-modal ul li:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: #e0f2fe;
}

/* Notificaciones vistas */
.notificaciones-modal ul li.visto {
  background-color: #f9fafb;
  color: #6b7280;
  border-left: 5px solid #d1d5db;
}

/* Notificaciones eliminadas */
.notificaciones-modal ul li.eliminado {
  background-color: #fef2f2;
  color: #9b1d1d;
  text-decoration: line-through;
  border-left: 5px solid #ef4444;
}

/* Estilo para los íconos */
.notificaciones-modal i {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.notificaciones-modal i:hover {
  transform: rotate(20deg);
}

/* Animación de la campana para llamar la atención */
.notificaciones-modal .indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animación al ingresar el modal */
@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animación para los elementos de la lista */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>
