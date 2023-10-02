import { createRouter, createWebHistory } from 'vue-router'




const routes = [
  {
    path: '/',
    redirect: '/authentication/login',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/authentication/login'
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: () => import('../modules/authentication/views/authenticationView.vue'),
    children: [
      {
        path: 'login',
        component: () => import('../modules/authentication/components/FormLogin.vue'),
        name: 'login',
      },
      {
        path: 'register',
        component: () => import('../modules/authentication/components/FormRegister.vue'),
        name: 'register',
      }
    ]
  },
  {
    path: '/dashboard-estudiante',
    name: 'dashboard-estudiante',
    component: () => import('../modules/dashboard/view/DashboardEstudianteView.vue')
  }
]







const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})


export default router
