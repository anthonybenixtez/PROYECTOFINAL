<template>
  <div class="carousel-container">
    <!-- Primer tarjeta -->
    <button>
      <router-link to="/agri" class="action-button"> 
        <div class="card-container">
          <div class="card">
            <img
              src="../../../assets/images/a1.jpg"
              alt="Card Image"
              class="card-image"
            />
            <div class="card-content" style="color:#4caf50">
              Ir a carrera
            </div>
          </div>
        </div>
      </router-link>
    </button>

    <!-- Segunda tarjeta -->
    <button>
      <router-link to="/social" class="action-button">
        <div class="card-container">
          <div class="card">
            <img
              src="../../../assets/images/a4.jpg"
              alt="Card Image"
              class="card-image"
            />
            <div class="card-content">
              Ir a carrera
            </div>
          </div>
        </div>
      </router-link>
    </button>

    <!-- Tercera tarjeta -->
    <button>
      <router-link to="/juri" class="action-button">
        <div class="card-container">
          <div class="card">
            <img
              src="../../../assets/images/a2.jpg"
              alt="Card Image"
              class="card-image"
            />
            <div class="card-content">
              Ir a carrera
            </div>
          </div>
        </div>
      </router-link>
    </button>

    <!-- Cuarta tarjeta -->
    <button>
      <router-link to="/CienciasComp" class="action-button">
        <div class="card-container">
          <div class="card">
            <img
              src="../../../assets/images/a3.jpg"
              alt="Card Image"
              class="card-image"
            />
            <div class="card-content">
              <h1>Ir a carrera</h1>
            </div>
          </div>
        </div>
      </router-link>
    </button>
  </div>

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
const showNotificationFlag = ref(false); // Flag para controlar la notificación

// Firebase Auth
const auth = getAuth();

// Detectar cambios en el estado de autenticación
auth.onAuthStateChanged((user) => {
  if (user) {
    isAuthenticated.value = true;
    if (showNotificationFlag.value) {
      showNotification("Sesión iniciada exitosamente");
    }
    showNotificationFlag.value = true; // Marcar que ya se mostró la notificación
  } else {
    isAuthenticated.value = false;
    if (showNotificationFlag.value) {
      showNotification("Sesión cerrada exitosamente");
    }
    showNotificationFlag.value = true; // Marcar que ya se mostró la notificación
  }
});

// Función para manejar la acción de autenticación
const handleAuthAction = async () => {
  if (isAuthenticated.value) {
    try {
      await signOut(auth); // Cerrar sesión
      router.push("/home"); // Redirigir a la página de inicio
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  } else {
    router.push("/login"); // Redirigir al login
  }
};

// Función para mostrar notificaciones
const showNotification = (message: string) => {
  notificationMessage.value = message;
  setTimeout(() => (notificationMessage.value = null), 3000);
};
</script>

<style scoped>
.card-container {
  margin: 47px;
  width: 100%; /* Ancho inicial para pantallas pequeñas */
  max-width: 400px; /* Máximo ancho de cada tarjeta */
  min-width: 200px; /* Mínimo ancho para evitar que sean muy pequeñas */
  perspective: 1000px;
  transition: all 0.3s ease;
}

.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 10cm;
  height: auto;
  object-fit: cover;
}

.carousel-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0px; /* Espaciado entre tarjetas */
}

/* Responsividad */
@media (max-width: 1024px) {
  .card-container {
    width: calc(100% - 10px); /* Dos tarjetas por fila */
  }
}

@media (max-width: 768px) {
  .card-container {
    width: calc(100% - 10px); /* Una tarjeta por fila */
  }
}

</style>