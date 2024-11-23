<template>
  <div class="carousel-container">
    <!-- Primer tarjeta -->
    <div class="card-container">
      <div class="card">
        <img
          src="https://scontent.fsal5-1.fna.fbcdn.net/v/t39.30808-6/464324892_950813893754770_4848616014093840837_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE_BkqzctWJtSi-2Tn-_hVpUKDwmCxbthlQoPCYLFu2GfqGS4fCVJUZDV9hBfGAPkOPUGBVKEhY5889hwFgbN4v&_nc_ohc=CD3yhXcXbKAQ7kNvgGNCwfg&_nc_zt=23&_nc_ht=scontent.fsal5-1.fna&_nc_gid=ApccQyGM0Std8x1Omb-lYAt&oh=00_AYBsJFZt48kdSkO42yn_EGSvjXrm8Xkj2BE0YkabfoPtgw&oe=67472632"
          alt="Card Image"
          class="card-image"
        />
        <div class="card-content">
          <button>
            <router-link to="/agri" class="action-button">Ir a carrera</router-link>
          </button>
        </div>
      </div>
    </div>

    <!-- Segunda tarjeta -->
    <div class="card-container">
      <div class="card">
        <img
          src="https://scontent.fsal5-1.fna.fbcdn.net/v/t39.30808-6/464399754_950768523759307_7624636869461307538_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG7ArCph3y7dFY9p3xLhW2CH36VbhLdD-gffpVuEt0P6KeYrBi0latwS5uXrhmmE_cuhQIIl-Et-GcKiu1MiW5D&_nc_ohc=xiXAhmzzvh8Q7kNvgFZkJ1n&_nc_zt=23&_nc_ht=scontent.fsal5-1.fna&_nc_gid=Azz90NIlL3QnFVkiTucixh_&oh=00_AYB-2nl7lJVEzXAaPkLQ-YbtzWtWAF5KbwLwUlujRRVFbw&oe=674719B0"
          alt="Card Image"
          class="card-image"
        />
        <div class="card-content">
          <button>
            <router-link to="/social" class="action-button">Ir a carrera</router-link>
          </button>
        </div>
      </div>
    </div>

    <!-- Tercera tarjeta -->
    <div class="card-container">
      <div class="card">
        <img
          src="https://scontent.fsal5-1.fna.fbcdn.net/v/t39.30808-6/464076299_950776450425181_2739963234830591985_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFN_nvGmT9Vgm2VowJFnELuqLMvXku-lRWosy9eS76VFdqhQVL1nMfksh_YuF7G6cgeTOHw87usWh_BFLm6gDom&_nc_ohc=k5XWhox2TNwQ7kNvgHrUzdQ&_nc_zt=23&_nc_ht=scontent.fsal5-1.fna&_nc_gid=Al6TvuF_9oaKqlJD2uvo0by&oh=00_AYDkg4_c-gsswkwAEhSq8ORnd0cTuZEIR9xHQ_KENicdwA&oe=67473F51"
          alt="Card Image"
          class="card-image"
        />
        <div class="card-content">
          <button>
            <router-link to="/juri" class="action-button">Ir a carrera</router-link>
          </button>
        </div>
      </div>
    </div>

    <!-- Cuarta tarjeta -->
    <div class="card-container">
      <div class="card">
        <img
          src="https://scontent.fsal1-1.fna.fbcdn.net/v/t39.30808-6/464316176_950776473758512_8839604362453402543_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEVNx0GWkZdykU0cgMxXTGkfBRnEIZvKwJ8FGcQhm8rAqdoG2PAEvOczC5B-l7T9XUuRv_bFQii_aENStsG9I_h&_nc_ohc=APqibT54B-gQ7kNvgHp7zHs&_nc_zt=23&_nc_ht=scontent.fsal1-1.fna&_nc_gid=ANqFbD2qcL1EicKM7NzqNlC&oh=00_AYAgI58wJru43y3AXWBzO6jZm-6ENfNQ9WJyKjDznaYiAw&oe=67473E2A"
          alt="Card Image"
          class="card-image"
        />
        <div class="card-content">
          <button>
            <router-link to="/CienciasComp" class="action-button">Ir a carrera</router-link>
          </button>
        </div>
      </div>
    </div>
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
.carousel-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  margin-bottom: 100px; /* Espacio adicional para evitar solapamiento */
}

.card-container {
  margin: 20px;
  width: 280px; /* Ajuste el tamaño de las tarjetas */
  perspective: 1000px;
}

.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: rotateY(10deg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: rotateY(0deg) translateY(-10px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.card-content {
  padding: 10px;
  text-align: center;
}

button, .group {
  z-index: 50; /* Asegura que los botones flotantes estén encima de las tarjetas */
}

/* Estilo de los botones flotantes */
.fixed {
  position: fixed;
}

.bg-red-600, .bg-green-600 {
  background-color: #e53e3e; /* Rojo */
  background-color: #48bb78; /* Verde */
}

.group-hover\:scale-110:hover {
  transform: scale(1.1);
}
</style>
