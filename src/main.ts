import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './modules/common/components/firebase'  // Importa el objeto de autenticación

const app = createApp(App)

app.use(router)

// Espera hasta que Firebase haya determinado el estado de autenticación antes de renderizar la app
auth.onAuthStateChanged((user) => {
  if (user) {
    // Si el usuario está autenticado, permite el acceso al router
    app.mount('#app')
  } else {
    // Si el usuario no está autenticado, redirige a la página principal de login
    router.push({ name: 'paginaprincipal' }).then(() => {
      app.mount('#app') // Monta la aplicación después de la redirección
    })
  }
})
