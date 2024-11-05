import { createRouter, createWebHistory } from 'vue-router';

import ProjectsLayouts from '@/modules/project/layouts/ProjectsLayouts.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectsLayouts,
    },
    {
      path: '/juri',
      name: 'ciencias_juridicas',
      component: () => import('@/modules/pages/cienciasj.vue'),
    },
    {
      path: '/agri',
      name: 'agricultura',
      component: () => import('@/modules/pages/agricultura.vue'),
    },
    {
      path: '/social',
      name: 'trabajo_social',
      component: () => import('@/modules/pages/trabajos.vue'),
    },
    {
      path: '/login', // Nueva ruta añadida
      name: 'login',
      component: () => import('@/modules/pages/Login-page.vue'), // Asegúrate que esta ruta es correcta
    },
  ],
});

export default router;
