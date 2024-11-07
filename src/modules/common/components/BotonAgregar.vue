<template>
    <button
      @click="agregarEvento"
      class="fixed bottom-8 left-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
    >
      <i class="fas fa-plus h-6 w-6"></i>
    </button>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    agregarEvento: Function
  });
  </script>
  