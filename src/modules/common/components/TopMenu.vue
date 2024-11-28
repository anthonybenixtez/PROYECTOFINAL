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
          :key="index"
          :class="{'visto': !evento.nuevo}"
          class="py-2 border-b"
        >
          <p><strong>Título:</strong> {{ evento.titulo }}</p>
          <p><strong>Descripción:</strong> {{ evento.descripcion }}</p>
          <p><strong>Carrera:</strong> {{ evento.categoria }}</p>
        </li>
      </ul>
      <div class="modal-action">
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
const eventosActualizados = ref([]);

let unsubscribe = null;

// Escuchar eventos en tiempo real
const escucharEventos = () => {
  unsubscribe = escucharEventosFirestore((nuevosEventos) => {
    eventos.value = nuevosEventos;
    contadorNuevos.value = nuevosEventos.filter(evento => evento.nuevo).length;
  });
};

// Abrir modal de notificaciones
const abrirNotificaciones = () => {
  mostrarNotificaciones.value = true;
  eventosActualizados.value = eventos.value.map(evento => ({ ...evento, nuevo: false }));
};

// Cerrar modal y actualizar eventos
const cerrarNotificaciones = async () => {
  mostrarNotificaciones.value = false;
  const eventosNuevos = eventosActualizados.value.filter(evento => !evento.nuevo);
  await Promise.all(
    eventosNuevos.map(evento =>
      actualizarEventoFirestore({ ...evento, nuevo: false })
    )
  );
  eventos.value = [...eventosActualizados.value];
  contadorNuevos.value = 0;
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
/* Estilos del modal de notificaciones */
.notificaciones-modal .modal-box {
  background: linear-gradient(135deg, #ffffff, #f0f8ff);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 900px;
}

.notificaciones-modal h3 {
  color: #1e40af;
  text-align: center;
  font-size: 1.5rem;
}

.notificaciones-modal ul li {
  display: flex;
  gap: 10px;
  padding: 15px;
  border-radius: 8px;
  background-color: #e0f2fe;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.notificaciones-modal ul li:hover {
  transform: scale(1.03);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background-color: #bae6fd;
}

.notificaciones-modal ul li.visto {
  background-color: #f3f4f6;
  color: #6b7280;
}
</style>
