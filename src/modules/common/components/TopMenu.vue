<template>
  <div class="navbar bg-blue-600 text-white shadow-md">
    <!-- Navbar Start -->
    <div class="navbar-start">
      <!-- Dropdown Menu for mobile -->
      <div class="dropdown">
        <button
          tabindex="0"
          class="btn btn-ghost btn-circle text-white"
          @click="toggleMenu"
        >
          <i class="fas fa-bars h-6 w-6"></i>
        </button>
        <ul
          v-show="isMenuOpen"
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-lg mt-3 w-52 p-3 z-50"
        >
          <li>
            <router-link to="/home" active-class="active-link" class="hover:text-blue-500 text-gray-800 flex items-center">
              <i class="fas fa-home h-6 w-6 mr-2"></i>
              Inicio
            </router-link>
          </li>
          <li>
            <details open class="group">
              <summary class="group-hover:text-blue-500 text-gray-800 flex items-center">
                <i class="fas fa-graduation-cap h-6 w-6 mr-2"></i>
                Carreras
              </summary>
              <ul>
                <li>
                  <router-link to="/agri" active-class="active-link" class="hover:text-blue-500 text-gray-800 flex items-center">
                    <i class="fas fa-leaf h-6 w-6 mr-2"></i>
                    Agricultura
                  </router-link>
                </li>
                <li>
                  <router-link to="/juri" active-class="active-link" class="hover:text-blue-500 text-gray-800 flex items-center">
                    <i class="fas fa-gavel h-6 w-6 mr-2"></i>
                    Lic. en Ciencias Jurídicas
                  </router-link>
                </li>
                <li>
                  <router-link to="/social" active-class="active-link" class="hover:text-blue-500 text-gray-800 flex items-center">
                    <i class="fas fa-users h-6 w-6 mr-2"></i>
                    Lic. en Trabajo Social
                  </router-link>
                </li>
                <li>
                  <router-link to="/ContactoPagina" active-class="active-link" class="hover:text-blue-500 text-gray-800 flex items-center">
                    <i class="fas fa-envelope h-6 w-6 mr-2"></i>
                    Contáctanos
                  </router-link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <router-link to="/calendario" active-class="active-link" class="hover:text-blue-500 text-gray-800 flex items-center">
              <i class="fas fa-calendar-alt h-6 w-6 mr-2"></i>
              Calendario de Eventos
            </router-link>
          </li>
          <li>
            <router-link to="/" active-class="active-link" class="hover:text-blue-500 text-gray-800 flex items-center">
              <i class="fas fa-sign-out-alt h-6 w-6 mr-2"></i>
              Cerrar Sesión
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Navbar Center -->
    <div class="navbar-center">
      <a class="btn btn-ghost text-xl font-semibold text-white">Eventos ULS</a>
    </div>

    <!-- Navbar End -->
    <div class="navbar-end space-x-3">
      <!-- Search Button -->
      <button class="btn btn-ghost btn-circle text-white">
        <i class="fas fa-search h-6 w-6"></i>
      </button>

      <!-- Notification Button -->
      <button class="btn btn-ghost btn-circle text-white">
        <div class="indicator">
          <i class="fas fa-bell h-6 w-6"></i>
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Variable para controlar el estado del menú desplegable
const isMenuOpen = ref(false);

// Función para alternar la visibilidad del menú
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Asegura que solo el menú desplegable se superponga */
.dropdown-content {
  z-index: 50; /* Establece un z-index alto para el menú desplegable */
}
</style>
