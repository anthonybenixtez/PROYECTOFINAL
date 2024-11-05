<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

      <!-- Formulario de correo y contraseña -->
      <form @submit.prevent="loginWithEmail">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700" for="email">Correo</label>
          <input
            v-model="email"
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700" for="password">Contraseña</label>
          <input
            v-model="password"
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            required
          />
        </div>
        <button
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          type="submit"
        >
          Iniciar Sesión
        </button>
      </form>

      <div class="mt-6 text-center">o</div>

      <!-- Botón para iniciar sesión con Google -->
      <button
        class="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
        @click="loginWithGoogle"
      >
        Iniciar Sesión con Google
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default {
  setup() {
    const email = ref('');
    const password = ref('');

    // Función para iniciar sesión con correo y contraseña
    const loginWithEmail = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log('Usuario autenticado:', userCredential.user);
        // Redirecciona o realiza alguna acción después de la autenticación
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
      }
    };

    // Función para iniciar sesión con Google
    const loginWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        console.log('Usuario autenticado:', result.user);
        // Redirecciona o realiza alguna acción después de la autenticación
      } catch (error) {
        console.error('Error al iniciar sesión con Google:', error.message);
      }
    };

    return {
      email,
      password,
      loginWithEmail,
      loginWithGoogle,
    };
  },
};
</script>

<style scoped>
/* Aquí puedes agregar estilos adicionales si es necesario */
</style>
