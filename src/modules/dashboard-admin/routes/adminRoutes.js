

// rutas para el modulo de dashboardAdmin
const adminRoutes = [
    {
        path: '/dashboard-admin',
        name: 'dashboard-admin',
        component: () => import('../view/DashboardAdminView.vue'),
        redirect: { name: 'view-estudiantes' },
        children: [
            {
                path: 'estuiantes',
                name: 'view-estudiantes',
                component: () => import('../view/EstudiantesView.vue')
            },
            {
                path: 'Habilitaciones',
                name: 'view-habilitacion',
                component: () => import('../view/HabilitacionesView.vue')
            },
        ],
        meta: { requiresAuth: true, role: 2 },
        exact: true
    },
    {
        path: '/dashboard-admins',
        name: 'dashboard-admin-all-access',
        component: () => import('../view/DashboardAdminView.vue'),
        redirect: { name: 'view-admins' },
        children: [
            {
                path: 'Administradores',
                name: 'view-admins',
                component: () => import('../view/AdministradoresView.vue')
            },
        ],
        meta: { requiresAuth: true, role: 1 },
        exact: true
    },
];



export default adminRoutes;