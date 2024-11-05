<template>
  <TopMenu />

  <!-- Si el usuario está autenticado, muestra el contenido -->
  <div v-if="user">
    <RouterView />
  </div>

  <!-- Si el usuario no está autenticado, redirige o muestra un mensaje -->
  <div v-else>
    <p class="text-center mt-8 text-gray-500">No estás autenticado. Por favor inicia sesión.</p>
  </div>
</template>

<script setup lang="ts">
import './style.css';
import TopMenu from './modules/common/components/TopMenu.vue';
import { ref, onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Estado reactivo para almacenar el usuario
const user = ref(null);

// Detecta cambios en el estado de autenticación de Firebase
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser;
      console.log('Usuario autenticado:', currentUser);
    } else {
      user.value = null;
      console.log('No estás autenticado');
    }
  });
});
</script>

<style scoped>
/* Puedes agregar estilos si es necesario */
</style>
