<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="card bg-base-200 w-96 shadow-xl rounded-2xl overflow-hidden">
      <figure>
        <img
          class="w-full h-56 object-cover rounded-t-2xl"
          src="https://www.elsoldelbajio.com.mx/local/hwbt9m-feria-de-la-salud-sma-1/ALTERNATES/LANDSCAPE_768/feria-de-la-salud-sma-1"
          alt="Feria de Salud"
        />
      </figure>
      <div class="card-body p-6">
        <h2 class="card-title text-2xl font-semibold text-gray-800">
          Feria de Salud!
          <div class="badge badge-secondary">Nuevo!!</div>
        </h2>
        <p class="text-gray-700 mt-2 mb-4">
          Ven y descubre los beneficios proporcionados en nuestra Feria de Salud, ¡te esperamos con ansias!
        </p>
        <div class="card-actions justify-between mt-4">
          <div class="badge badge-outline text-lg text-gray-600">Trabajo Social</div>
          <button
            class="btn btn-primary"
            @click="myModal = true"
          >
            Dirección
          </button>
        </div>
      </div>

      <!-- Modal -->
      <dialog :open="myModal" class="modal">
        <div class="modal-box w-full max-w-2xl">
          <h4 class="text-center text-xl font-semibold">Departamento de Ciencias Jurídicas</h4>
          <figure class="mt-4">
            <img
              class="w-full h-96 object-cover rounded-lg"
              src="https://uls.edu.sv/sitioweb/images/2022/IMG_5547.JPG"
              alt="Imagen de la facultad"
            />
          </figure>
          <div class="modal-action mt-4 flex justify-center">
            <button
              class="btn btn-secondary"
              @click="myModal = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const myModal = ref(false);
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
