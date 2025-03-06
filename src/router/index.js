import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/legends',
    },
    {
      path: '/legends',
      name: 'legends-list',
      component: () => import('../views/LegendListView.vue'),
      meta: { title: 'Listado de Leyendas' }
    },
    {
      path: '/legends/create',
      name: 'legend-create',
      component: () => import('../views/LegendCreateView.vue'),
      meta: { title: 'Crear Nueva Leyenda' }
    },
    {
      path: '/legends/edit/:id',
      name: 'legend-edit',
      component: () => import('../views/LegendEditView.vue'),
      props: true,
      meta: { title: 'Editar Leyenda' }
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'Leyendas Costarricenses'
})

export default router