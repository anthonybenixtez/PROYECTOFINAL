import { createRouter, createWebHistory } from 'vue-router';
import Paginaprincipal from '@/modules/common/components/paginaprincipal.vue';
import { auth } from '@/modules/common/components/firebase';

// Estado global de carga para esperar la verificación de autenticación
let isAuthChecked = false;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'paginaprincipal',
      component: Paginaprincipal,
    },
    {
      path: '/home',
      name: 'proyectlayout',
      component: () => import('@/modules/project/layouts/ProjectsLayouts.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/juri',
      name: 'ciencias_juridicas',
      component: () => import('@/modules/pages/cienciasj.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/agri',
      name: 'agricultura',
      component: () => import('@/modules/pages/agricultura.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/social',
      name: 'trabajo_social',
      component: () => import('@/modules/pages/trabajos.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/calendario',
      name: 'calendario',
      component: () => import('@/modules/pages/calendario.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/ContactoPagina',
      name: 'ContactoPagina',
      component: () => import('@/modules/pages/ContactoPagina.vue'),
    },
    {
      path: '/forciencias',
      name: 'form_ciencias',
      component: () => import('@/modules/pages/forciencias.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

// Guard de navegación para proteger rutas
router.beforeEach(async (to, from, next) => {
  // Si no se ha comprobado el estado de autenticación, esperamos que Firebase lo haga
  if (!isAuthChecked) {
    const user = await new Promise((resolve) => {
      auth.onAuthStateChanged(resolve); // Espera a que Firebase confirme el estado de autenticación
    });

    // Una vez comprobado, marca el estado como verificado
    isAuthChecked = true;

    // Si el usuario no está autenticado, redirige al login
    if (to.matched.some(record => record.meta.requiresAuth) && !user) {
      return next({ name: 'paginaprincipal' });
    }
  }
  // Permite la navegación si todo está listo
  next();
});

export default router;
