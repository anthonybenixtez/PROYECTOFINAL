<template>
  <div class="welcome-container">
    <h2 class="welcome-title">¡Bienvenido a nuestra Página web!</h2>
    <p class="welcome-subtitle">
      Explora los eventos de nuestra universidad de forma rápida y sencilla
    </p>
  </div>

  <!-- Notificación -->
  <transition name="fade">
    <div
      v-if="notificationMessage"
      class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg z-50"
    >
      {{ notificationMessage }}
    </div>
  </transition>

  <!-- Botón flotante dinámico (Iniciar/Cerrar Sesión) -->
  <button
    @click="handleAuthAction"
    class="fixed bottom-5 left-0 text-white rounded-r-full shadow-lg flex items-center justify-center h-14 w-16 -translate-x-1/4 hover:translate-x-0 transition-transform duration-300 ease-in-out group"
    :class="isAuthenticated ? 'bg-red-600' : 'bg-green-600'"
    :title="isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'"
  >
    <i
      :class="isAuthenticated ? 'fas fa-sign-out-alt' : 'fas fa-sign-in-alt'"
      class="text-2xl group-hover:scale-110 transition-transform"
    ></i>
  </button>

  <!-- Botón flotante Calendario -->
  <router-link
    to="/calendario"
    class="fixed bottom-20 right-0 bg-green-600 text-white rounded-l-full shadow-lg flex items-center justify-center h-14 w-16 translate-x-1/4 hover:translate-x-0 transition-transform duration-300 ease-in-out group"
    title="Calendario"
  >
    <i class="fas fa-calendar-alt text-2xl group-hover:scale-110 transition-transform"></i>
  </router-link>

  <!-- Botón flotante Contáctanos -->
  <router-link
    to="/ContactoPagina"
    class="fixed bottom-5 right-0 bg-blue-600 text-white rounded-l-full shadow-lg flex items-center justify-center h-14 w-16 translate-x-1/4 hover:translate-x-0 transition-transform duration-300 ease-in-out group"
    title="Contáctanos"
  >
    <i class="fas fa-envelope text-2xl group-hover:scale-110 transition-transform"></i>
  </router-link>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth"; // Firebase Auth

// Router para navegación
const router = useRouter();

// Estados reactivos
const isAuthenticated = ref(false);
const notificationMessage = ref<string | null>(null);

// Firebase Auth
const auth = getAuth();

// Detectar cambios en el estado de autenticación
auth.onAuthStateChanged((user) => {
  if (user) {
    isAuthenticated.value = true;
    showNotification("Sesión iniciada exitosamente");
  } else {
    isAuthenticated.value = false;
    showNotification("Sesión cerrada exitosamente");
  }
});

// Función para manejar la acción de autenticación
const handleAuthAction = async () => {
  if (isAuthenticated.value) {
    try {
      await signOut(auth); // Cerrar sesión
      router.push("/home"); // Redirigir al inicio
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      showNotification("Error al cerrar sesión");
    }
  } else {
    router.push("/login"); // Redirigir al login
  }
};

// Función para mostrar notificación
const showNotification = (message: string) => {
  notificationMessage.value = message;
  setTimeout(() => {
    notificationMessage.value = null; // Ocultar mensaje después de 3 segundos
  }, 3000);
};
</script>




<style scoped>
.welcome-container {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
}

.welcome-title {
  font-size: 3rem;
  font-weight: bold;
  color: #4caf50; /* Verde llamativo */
  margin: 0;
  animation: fadeIn 2s ease-out, slideUp 1s ease-out 0.5s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.welcome-subtitle {
  font-size: 1.25rem;
  color: #ffa726; /* Naranja vibrante */
  margin: 10px 0;
  animation: fadeIn 2s ease-out, slideUp 1s ease-out 1s;
  opacity: 0;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

