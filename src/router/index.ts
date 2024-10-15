import { createRouter, createWebHistory } from 'vue-router';
import Paginaprincipal from '@/modules/common/components/paginaprincipal.vue';
import { auth } from '@/modules/common/components/firebase';

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
  ],
});

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const loggedIn = !!auth.currentUser; // Verifica si el usuario está autenticado

  // Si la ruta requiere autenticación y no hay un usuario autenticado, redirige a la página principal
  if (requiresAuth && !loggedIn) {
    next({ name: 'paginaprincipal' });
  } else {
    next(); // Permite el acceso
  }
});

export default router;
