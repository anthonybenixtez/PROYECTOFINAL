<template>
  <div class="w-full bg-white shadow-md py-4">
    <!-- Barra de búsqueda -->
    <div class="container mx-auto px-4 flex justify-center">
      <input
        type="text"
        v-model="busqueda"
        class="input input-bordered w-full max-w-lg"
        placeholder="Buscar evento..."
      />
    </div>
  </div>

  <div class="flex justify-center items-center min-h-screen bg-gray-100 relative">
    <!-- Contenedor de tarjetas de eventos con separación y máximo de 4 tarjetas por fila -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 px-4">
      <!-- Mostrar eventos existentes -->
      <div
        v-for="(evento, index) in eventosFiltrados"
        :key="index"
        class="card bg-base-200 w-full shadow-xl rounded-2xl overflow-hidden relative pb-16"
      >
        <figure>
          <img
            class="w-full h-56 object-cover rounded-t-2xl"
            :src="evento.imagen"
            :alt="evento.titulo"
          />
        </figure>
        <div class="card-body p-6">
          <h2 class="card-title text-2xl font-semibold text-gray-800">
            {{ evento.titulo }}
            <div v-if="evento.nuevo" class="badge badge-secondary">Nuevo!!</div>
          </h2>
          <p class="text-gray-700 mt-2 mb-4">{{ evento.descripcion }}</p>
          <div class="card-actions justify-between mt-4 space-x-4">
            <div class="badge badge-outline text-lg text-gray-600">Trabajo Social</div>
          </div>
        </div>

        <!-- Botón Dirección (izquierda) -->
        <button
          class="btn bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 absolute bottom-4 left-4"
          @click="verDireccion(evento)"
        >
          <i class="fas fa-map-marker-alt"></i>
        </button>

        <!-- Botón Editar (derecha) -->
        <button
          v-if="isLoggedIn"
          class="btn bg-gray-500 hover:bg-gray-600 text-white rounded-full p-3 absolute bottom-4 right-4"
          @click="editarEvento(evento)"
        >
          <i class="fas fa-edit"></i>
        </button>
      </div>
    </div>

    <!-- Botón para agregar un nuevo evento -->
    <div v-if="isLoggedIn">
      <button
        class="btn bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 text-white rounded-full shadow-xl fixed bottom-5 right-5 w-16 h-16 flex items-center justify-center text-4xl transition-transform transform hover:scale-110 active:scale-100 focus:outline-none focus:ring-4 focus:ring-teal-500"
        @click="agregarEvento"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <!-- Formulario para agregar o editar un evento -->
    <FormularioEvento
      v-if="showForm"
      :showForm="showForm"
      :nuevoEvento="nuevoEvento"
      :guardarEvento="guardarEvento"
      :eliminarEvento="eliminarEvento"
      @cancelarEdicion="cancelarEdicion"
    />

    <!-- Modal para ver la dirección del evento -->
    <dialog :open="myModal" class="modal">
      <div class="modal-box w-full max-w-2xl">
        <h4 class="text-center text-xl font-semibold">{{ nuevoEvento.titulo }}</h4>
        <figure class="mt-4">
          <img
            class="w-full h-96 object-cover rounded-lg"
            :src="nuevoEvento.imagen"
            alt="Imagen de evento"
          />
        </figure>
        <div class="modal-action mt-4 flex justify-center">
          <button class="btn btn-secondary" @click="myModal = false">Cerrar</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { useAuthState } from "../common/components/authState.ts";
// Estado de autenticación
const { isLoggedIn } = useAuthState();

import { ref, onMounted, computed } from 'vue';
import {
  obtenerEventosFirestore,
  agregarEventoFirestore,
  actualizarEventoFirestore,
  eliminarEventoFirestore,
} from '@/modules/common/components/firebase';
import FormularioEvento from '../common/components/FormularioEvento.vue';

// Estados reactivos
const myModal = ref(false);
const showForm = ref(false);
const eventos = ref([]);
const busqueda = ref(''); // Variable reactiva para el texto de búsqueda
const nuevoEvento = ref({
  id: '',
  titulo: '',
  imagen: '',
  descripcion: '',
  categoria: 'Trabajo Social',
  nuevo: true,
});

// Cargar eventos al montar el componente
onMounted(async () => {
  const todosLosEventos = await obtenerEventosFirestore();
  eventos.value = todosLosEventos.filter(
    (evento) => evento.categoria === 'Trabajo Social'
  ); // Filtrar por categoría
});

// Computed property para filtrar eventos según la búsqueda
const eventosFiltrados = computed(() => {
  return eventos.value.filter(evento =>
    evento.titulo.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});

// Agregar un nuevo evento
const agregarEvento = () => {
  showForm.value = true;
  nuevoEvento.value = {
    id: '',
    titulo: '',
    imagen: '',
    descripcion: '',
    categoria: 'Trabajo Social', // Asignar la categoría automáticamente
    nuevo: true,
  };
};

// Editar un evento existente
const editarEvento = (evento) => {
  showForm.value = true;
  nuevoEvento.value = { ...evento };
};

// Guardar un evento (crear o actualizar)
const guardarEvento = async () => {
  if (nuevoEvento.value.titulo && nuevoEvento.value.imagen) {
    if (nuevoEvento.value.id) {
      await actualizarEventoFirestore({ ...nuevoEvento.value });
    } else {
      await agregarEventoFirestore({ ...nuevoEvento.value });
    }
    const todosLosEventos = await obtenerEventosFirestore();
    eventos.value = todosLosEventos.filter(
      (evento) => evento.categoria === 'Trabajo Social'
    ); // Actualizar eventos filtrados
    showForm.value = false;
  } else {
    alert('Por favor, ingresa un título y una imagen para el evento');
  }
};

// Eliminar un evento
const eliminarEvento = async (id) => {
  await eliminarEventoFirestore(id);
  const todosLosEventos = await obtenerEventosFirestore();
  eventos.value = todosLosEventos.filter(
    (evento) => evento.categoria === 'Trabajo Social'
  );
};

// Mostrar dirección en el modal
const verDireccion = (evento) => {
  nuevoEvento.value = evento;
  myModal.value = true;
};

// Cancelar edición
const cancelarEdicion = () => {
  showForm.value = false;
};
</script>

<style scoped>
/* Estilos para las tarjetas */
.grid {
  gap: 1.5rem; /* Espacio entre las tarjetas */
}

.card {
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .card {
    width: 100% !important;
  }
}

@media (min-width: 768px) {
  .card {
    width: 22rem;
  }
}

@media (max-width: 640px) {
  .input {
    padding: 1rem;
  }

  .modal-box {
    padding: 1rem;
  }
}
</style>
