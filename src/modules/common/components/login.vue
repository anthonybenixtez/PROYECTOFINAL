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
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('Usuario autenticado:', userCredential.user);
    isLoggedIn.value = true; // Cambia el estado cuando el usuario se autentica correctamente
    router.push('/home');  // Redirige a la página de inicio después de iniciar sesión
  } catch (error) {
    console.error('Error de autenticación:', error);
  }
};

const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log('Usuario desconectado');
    isLoggedIn.value = false; // Cambia el estado al cerrar sesión
    router.push('/login');  // Redirige a la página de login después de cerrar sesión
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script>

<style scoped>
/* Fondo de pantalla más limpio y moderno */
body {
  background-color: #f9fafb;
}
</style>
