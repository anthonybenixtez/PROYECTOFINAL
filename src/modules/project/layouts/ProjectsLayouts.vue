<template>
  <div class="flex flex-col">
    <div>
      <Bienvenido />
    </div>
    <main class="flex">
      <Carrusel />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Bienvenido from '@/modules/common/components/Bienvenido.vue';
import Carrusel from '@/modules/common/components/carrusel.vue';
</script>
