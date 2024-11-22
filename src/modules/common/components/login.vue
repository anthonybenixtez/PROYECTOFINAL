<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-300">
      <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">
        Iniciar Sesión
      </h2>
      <form @submit.prevent="handleSubmit">
        <!-- Campo de correo electrónico -->
        <input
          type="email"
          v-model="email"
          placeholder="Correo Electrónico"
          required
          class="border border-gray-300 p-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        
        <!-- Campo de contraseña -->
        <input
          type="password"
          v-model="password"
          placeholder="Contraseña"
          required
          class="border border-gray-300 p-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        
        <!-- Botón de enviar -->
        <button
          type="submit"
          class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 w-full"
        >
          Iniciar Sesión
        </button>
      </form>
      
      <!-- Botón de cierre de sesión -->
      <button 
        v-if="isLoggedIn" 
        @click="handleSignOut" 
        class="mt-4 text-sm text-red-600 hover:underline"
      >
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const email = ref('');
const password = ref('');
const isLoggedIn = ref(false);  // Estado para saber si el usuario está logueado
const router = useRouter();

const handleSubmit = async () => {
  try {
    // Iniciar sesión
    await signInWithEmailAndPassword(auth, email.value, password.value);
    isLoggedIn.value = true;  // Cambia el estado a 'logueado'
    alert('Inicio de sesión exitoso');
    router.push('/home'); // Redirige a la página de inicio
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert('Error desconocido');
    }
  }
};

// Función para cerrar sesión
const handleSignOut = async () => {
  try {
    await signOut(auth); // Cerrar sesión en Firebase
    isLoggedIn.value = false; // Cambia el estado a 'no logueado'
    alert('Has cerrado sesión');
    
    // Redirige a la página principal después de cerrar sesión
    router.push('/home');  // Redirige correctamente a '/home' para mostrar la página principal
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert('Error desconocido');
    }
  }
};
</script>

<style scoped>
/* Fondo de pantalla más limpio y moderno */
body {
  background-color: #f9fafb;
}
</style>
