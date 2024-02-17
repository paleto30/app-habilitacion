import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../modules/authentication/stores/authStore.js';
import authRutes from '../modules/authentication/routes/authRoutes.js';
import studentsRoutes from '../modules/dashboard/routes/studentsRoutes.js';
import adminRoutes from '../modules/dashboard-admin/routes/adminRoutes.js';
import ErrorView from '../shared/view/ErrorView.vue';

const routes = [
    {
        path: '/',
        redirect: '/authentication/login',
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error',
        component: ErrorView
        //redirect: '/authentication/login'
    },
]


// aregamos las demas rutas al array de rutas principal
Array.prototype.push.apply(routes, authRutes);
Array.prototype.push.apply(routes, studentsRoutes);
Array.prototype.push.apply(routes, adminRoutes);






const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})


router.beforeEach(async (to, from, next) => {
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
