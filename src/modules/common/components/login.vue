<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full sm:w-96 max-w-lg">
      <h2 class="text-3xl font-extrabold text-center mb-6 text-gray-800">
        Iniciar Sesión
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Campo de correo electrónico -->
        <div>
          <input
            type="email"
            v-model="email"
            placeholder="Correo Electrónico"
            required
            class="input input-bordered w-full rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <!-- Campo de contraseña -->
        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Contraseña"
            required
            class="input input-bordered w-full rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <!-- Botón de enviar -->
        <div>
          <button
            type="submit"
            class="btn btn-primary w-full py-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Iniciar Sesión
          </button>
        </div>

        <!-- Enlace para recuperar la contraseña -->
        <div class="text-center">
          <a href="#" class="text-sm text-blue-500 hover:text-blue-700">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
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
