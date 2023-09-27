import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/authentication',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/authentication/login'
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: () => import('../modules/authentication/views/authenticationView.vue')
    }
  ]
})

export default router
