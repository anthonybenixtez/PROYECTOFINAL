<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-300">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">
          {{ isLogin ? 'Iniciar Sesión' : 'Registrar' }}
        </h2>
        <form @submit.prevent="handleSubmit">
          <input
            type="email"
            v-model="email"
            placeholder="Correo Electrónico"
            required
            class="border border-gray-300 p-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="password"
            v-model="password"
            placeholder="Contraseña"
            required
            class="border border-gray-300 p-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 w-full"
          >
            {{ isLogin ? 'Iniciar Sesión' : 'Registrar' }}
          </button>
          <p class="mt-4 text-center text-sm text-gray-600 cursor-pointer" @click="toggleMode">
            {{ isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión' }}
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; // Importa el router
  import { auth } from './firebase';
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
  
  const email = ref('');
  const password = ref('');
  const isLogin = ref(true);
  const router = useRouter(); // Agrega esto para usar el router
  
  const handleSubmit = async () => {
    try {
      if (isLogin.value) {
        // Iniciar sesión
        await signInWithEmailAndPassword(auth, email.value, password.value);
        alert('Inicio de sesión exitoso');
        router.push('/home'); // Redirige a la página que prefieras
      } else {
        // Registrar nuevo usuario
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        alert('Registro exitoso');
      }
    } catch (error: unknown) {
      console.error(error);
  
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Error desconocido');
      }
    }
  };
  
  const toggleMode = () => {
    isLogin.value = !isLogin.value;
  };
  </script>
  
  <style scoped>
  /* Fondo de pantalla más limpio y moderno */
  body {
    background-color: #f9fafb;
  }
  </style>
  