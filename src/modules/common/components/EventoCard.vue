<template>
    <div class="card bg-base-200 w-96 shadow-xl rounded-2xl overflow-hidden">
      <figure>
        <img
          :src="evento.imagen"
          alt="Imagen del evento"
          class="w-full h-56 object-cover rounded-t-2xl"
        />
      </figure>
      <div class="card-body p-6">
        <h2 class="card-title text-2xl font-semibold text-gray-800">
          {{ evento.titulo }}
          <div class="badge badge-secondary" v-if="evento.nuevo">Nuevo!!</div>
        </h2>
        <p class="text-gray-700 mt-2 mb-4">{{ evento.descripcion }}</p>
        <div class="card-actions justify-between mt-4">
          <div class="badge badge-outline text-lg text-gray-600">
            Licenciatura en Ciencias Jurídicas
          </div>
          <button class="btn btn-primary" @click="verDireccion(evento)">
            Dirección
          </button>
          <button class="btn btn-warning" @click="editarEvento(evento)">
            Editar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    evento: Object,
    verDireccion: Function,
    editarEvento: Function
  });
  </script>
  