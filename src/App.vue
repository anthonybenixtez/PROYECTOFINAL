<template>
  <!-- Renderiza el Navbar solo si no estás en la página de login -->
  <Navbar v-if="!isLoginPage" /> 

  <!-- Main -->
  <main class="flex-1 overflow-auto">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './modules/common/components/TopMenu.vue';

const route = useRoute();
const isLoginPage = computed(() => route.name === 'login'); // Verifica si la ruta es la de login
</script>

<style scoped>
/* Estilos generales */
</style>
