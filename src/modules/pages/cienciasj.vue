<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 relative">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <EventoCard
        v-for="(evento, index) in eventos"
        :key="index"
        :evento="evento"
        :verDireccion="verDireccion"
        :editarEvento="editarEvento"
      />
    </div>

    <BotonAgregar :agregarEvento="agregarEvento" />
    <FormularioEvento
      v-if="showForm"
      :showForm="showForm"
      :nuevoEvento="nuevoEvento"
      :guardarEvento="guardarEvento"
      :eliminarEvento="eliminarEvento"
      @cancelarEdicion="cancelarEdicion"
    />
    <Modal :isOpen="myModal" :evento="nuevoEvento" @update:isOpen="myModal = $event" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { agregarEventoFirestore, obtenerEventosFirestore, actualizarEventoFirestore, eliminarEventoFirestore } from '@/modules/common/components/firebase'; 
import EventoCard from '../common/components/EventoCard.vue';
import FormularioEvento from '../common/components/FormularioEvento.vue';
import Modal from '../common/components/ModalC.vue';
import BotonAgregar from '../common/components/BotonAgregar.vue';

const myModal = ref(false);  // Controla la visibilidad del modal
const nuevoEvento = ref({
  id: '',
  titulo: '',
  imagen: '',
  descripcion: '',
  nuevo: true
});
const showForm = ref(false);
const eventos = ref([]);

onMounted(async () => {
  eventos.value = await obtenerEventosFirestore();
});

const agregarEvento = () => {
  showForm.value = true;
  nuevoEvento.value = { id: '', titulo: '', imagen: '', descripcion: '', nuevo: true };
};

const editarEvento = (evento) => {
  showForm.value = true;
  nuevoEvento.value = { ...evento };
};

const guardarEvento = async () => {
  if (nuevoEvento.value.titulo && nuevoEvento.value.imagen) {
    if (nuevoEvento.value.id) {
      await actualizarEventoFirestore({
        id: nuevoEvento.value.id,
        titulo: nuevoEvento.value.titulo,
        imagen: nuevoEvento.value.imagen,
        descripcion: nuevoEvento.value.descripcion
      });
    } else {
      await agregarEventoFirestore({
        titulo: nuevoEvento.value.titulo,
        imagen: nuevoEvento.value.imagen,
        descripcion: nuevoEvento.value.descripcion,
        nuevo: true
      });
    }

    eventos.value = await obtenerEventosFirestore();
    showForm.value = false;
    nuevoEvento.value = { id: '', titulo: '', imagen: '', descripcion: '', nuevo: true };
  } else {
    alert('Por favor, ingresa un título y una imagen para el evento');
  }
};

const eliminarEvento = async (id) => {
  await eliminarEventoFirestore(id);
  eventos.value = await obtenerEventosFirestore();
  showForm.value = false;
};

const verDireccion = (evento) => {
  nuevoEvento.value = evento;  // Establecer el evento seleccionado
  myModal.value = true;        // Abrir el modal
};

const cancelarEdicion = () => {
  // Esta función será llamada cuando el hijo emita el evento de cancelar
  showForm.value = false;
};
</script>
