<template>


<div class="flex flex-col items-center">
      <Calendar /> <!-- Aquí es donde se incluye el componente del calendario -->
    </div>
  </template>
  
  <script lang="ts" setup>

///////////////////////////////////////////////////
/////////////////PROBAR ROLE
import { useAuthState } from "../common/components/authState.ts";
// Estado de autenticación
const { isLoggedIn } = useAuthState();

////////////////////////////////////////////////////

  import Calendar from '@/modules/common/components/Calendar.vue'; // Asegúrate de que la ruta sea correcta
  </script>
  
  <style scoped>
  /* Aquí puedes añadir estilos adicionales para la página de calendario */
  </style>
  