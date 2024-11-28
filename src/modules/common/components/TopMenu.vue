<template>
  <div class="navbar bg-blue-600 text-white shadow-md">
    <!-- Navbar Start -->
    <div class="navbar-start">
      <router-link  to="/home" class="action-button" >
        <button>
          <i class="fa-solid fa-backward"></i>
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
      <button class="btn btn-ghost btn-circle text-white" @click="abrirNotificaciones">
        <div class="indicator">
          <i class="fas fa-bell h-6 w-6"></i>
          <span v-if="contadorNuevos > 0" class="badge badge-xs badge-primary indicator-item">{{ contadorNuevos }}</span>
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




import { useAuth } from '@/modules/common/components/useAuth.ts'; // Asegúrate de usar la ruta correcta
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { escucharEventosFirestore, actualizarEventoFirestore } from '@/modules/common/components/firebase';
const { handleSignOut } = useAuth();

const isMenuOpen = ref(false);
const eventos = ref([]);
const contadorNuevos = ref(0);
const mostrarNotificaciones = ref(false);
const eventosActualizados = ref([]); // Almacena los eventos marcados como "vistos"

// Variable para almacenar el unsubscribe del listener
let unsubscribe = null;

// Función para alternar el menú desplegable
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Escuchar eventos en tiempo real
const escucharEventos = () => {
  unsubscribe = escucharEventosFirestore((nuevosEventos) => {
    eventos.value = nuevosEventos;
    contadorNuevos.value = nuevosEventos.filter(evento => evento.nuevo).length;
  });
};

// Función para abrir el modal de notificaciones
const abrirNotificaciones = () => {
  mostrarNotificaciones.value = true;

  // Actualizar eventos solo localmente
  eventosActualizados.value = eventos.value.map(evento => ({
    ...evento,
    nuevo: false,
  }));
};

// Función para cerrar el modal de notificaciones
const cerrarNotificaciones = async () => {
  mostrarNotificaciones.value = false;

  // Sincronizar con Firebase al cerrar
  const eventosNuevos = eventosActualizados.value.filter(evento => evento.nuevo === false);
  await Promise.all(
    eventosNuevos.map(evento =>
      actualizarEventoFirestore({ ...evento, nuevo: false })
    )
  );

  // Actualizar eventos locales y contador
  eventos.value = [...eventosActualizados.value];
  contadorNuevos.value = 0;
};

// Cargar eventos al montar el componente
onMounted(() => {
  escucharEventos();
});

// Limpiar el listener al desmontar el componente
onBeforeUnmount(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>


<style scoped>
.notificaciones-modal .modal-box {
  background: linear-gradient(135deg, #ffffff, #f0f8ff);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 80%; /* Ajusta el porcentaje para hacerlo más ancho */
  max-width: 900px; /* Limita el ancho máximo para pantallas grandes */
}


.notificaciones-modal h3 {
  color: #1e40af; /* Azul oscuro */
  text-align: center;
  font-size: 1.5rem;
}

.notificaciones-modal ul li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 15px;
  border-radius: 8px;
  background-color: #e0f2fe; /* Azul claro */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.notificaciones-modal ul li:hover {
  transform: scale(1.03);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background-color: #bae6fd; /* Azul más claro */
}

.notificaciones-modal ul li::before {
  content: '🔔'; /* Ícono */
  font-size: 1.5rem;
  margin-right: 8px;
  color: #2563eb; /* Azul */
}

.notificaciones-modal ul li p strong {
  font-size: 1.1rem;
  color: #0f172a; /* Azul más oscuro */
}

.notificaciones-modal ul li p {
  font-size: 0.9rem;
  color: #1e293b; /* Azul grisáceo */
}

/* Estilo para notificaciones vistas */
.notificaciones-modal ul li.visto {
  background-color: #f3f4f6; /* Gris claro */
  color: #6b7280; /* Gris oscuro */
}

.notificaciones-modal ul li.visto:hover {
  transform: none;
  box-shadow: none;
  background-color: #e5e7eb; /* Gris más tenue */
}

.notificaciones-modal ul li.visto::before {
  content: '✓✓'; /* Check */
  color: #6b7280; /* Gris oscuro */
}

.notificaciones-modal .modal-action .btn {
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.notificaciones-modal .modal-action .btn:hover {
  background-color: #1e40af;
}
</style>
