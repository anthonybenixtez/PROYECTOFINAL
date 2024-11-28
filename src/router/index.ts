import { createRouter, createWebHistory } from 'vue-router';
import proyectlayout from '@/modules/project/layouts/ProjectsLayouts.vue';
import { auth } from '@/modules/common/components/firebase';

// Estado global de carga para esperar la verificación de autenticación

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'paginaprincipal',
      component: proyectlayout,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/modules/common/components/paginaprincipal.vue'),
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
      path: '/calendario',
      name: 'calendario',
      component: () => import('@/modules/pages/calendario.vue'),
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
    },
    {
      path: '/CienciasComp',
      name: 'CienciasComp',
      component: () => import('@/modules/pages/CienciasComp.vue'),
    },
  ],
});


export default router;
