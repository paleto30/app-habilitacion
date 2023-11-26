

// rutas para el modulo de dashboardAdmin
const adminRoutes = [
    {
        path: '/dashboard-admin',
        name: 'dashboard-admin',
        component: () => import('../view/DashboardAdminView.vue'),
        redirect: { name: 'dash-admin' },
        children:[
            {
                path: 'algo',
                name: 'dash-admin',
                component: () => import('../components/MyComponent.vue')
            },
            {
                path: 'otro',
                name: 'profes',
                component: () => import('../components/MyOther.vue')
            },
        ],
        meta: { requiresAuth: true, role: 2 },
        exact: true
    },
];



export default adminRoutes;