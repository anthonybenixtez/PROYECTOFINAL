import './assets/main.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { auth } from './modules/common/components/firebase'; // Importa el objeto de autenticación

const app = createApp(App);

app.use(router);

let isAuthChecked = false;

// Configura un observador para el estado de autenticación
auth.onAuthStateChanged((user) => {
  isAuthChecked = true; // Marca que la autenticación ha sido verificada
  if (user) {
    // Si el usuario está autenticado, puedes configurar roles si es necesario
    console.log('Usuario autenticado:', user);
  } else {
    // Si no hay usuario, redirige al login
    if (router.currentRoute.value.name !== 'paginaprincipal') {
      router.push({ name: 'paginaprincipal' });
    }
  }
});

// Agrega un guard global para verificar si el estado de autenticación ya fue evaluado
router.beforeEach((to, from, next) => {
  if (!isAuthChecked) {
    // Si el estado de autenticación no ha sido evaluado, espera
    const unwatch = auth.onAuthStateChanged(() => {
      unwatch(); // Detén el observador una vez que haya verificado
      next(); // Continua con la navegación
    });
  } else {
    next(); // Si ya está evaluado, continua normalmente
  }
});

// Monta la aplicación
app.mount('#app');
