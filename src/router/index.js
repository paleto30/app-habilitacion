import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../modules/authentication/stores/authStore.js';
// import authStudentGuard from './authStudentGuard.js';
// import authAdminGuard from './authAdminGuard.js';



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
    redirect: '/authentication/login',
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
      },
      {
        name: 'admin',
        path: 'admin/view/register',
        component: () => import('../modules/authentication/components/FormRegisterAdmin.vue')
      }
    ]
  },
  {
    path: '/dashboard-estudiante',
    name: 'dashboard-estudiante',
    component: () => import('../modules/dashboard/view/DashboardEstudianteView.vue'),
    meta: { requiresAuth: true, role: 3 }
    //beforeEnter: [authStudentGuard]
  },
  {
    path: '/dashboard-admin',
    name: 'dashboard-admin',
    component: () => import('../modules/dashboard-admin/view/DashboardAdminView.vue'),
    meta: { requiresAuth: true, role: 2  }
    //beforeEnter: [authAdminGuard]
  },
  {
    path: '/dashboard-super',
    name: 'dashboard-super',
    component: ()=> import('../modules/dashboard-admin/view/DashboardAdminView.vue'),
    meta: {requiresAuth: true , role: 1}
  }
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // esto retorna true si la ruta requiere auth
  const isAutenticated = useAuthStore().authUser !== null;  // esto tendra el valor de true si el usuario ya esta auten
  const role = to.matched.some(record => record.meta.role);
  const rol = role ? to.matched.find(record => record.meta.role).meta.role : null

  if ((requiresAuth && !isAutenticated) || (role && rol !== useAuthStore().authUser.rol)) {
    next({ name: 'login' });
  } else {
    next()
  }
});


export default router
