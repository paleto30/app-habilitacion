


// rutas para el modulo de dashboard de estudiantes
/* const studentsRoutes = [
    {
        path: '/dashboard-estudiante',
        name: 'dashboard-estudiante',
        component: () => import('../view/DashboardEstudianteView.vue'),
        redirect: { name: 'solicitudes' },
        children: [
            {
                path: 'solicitar-habilitacion',
                name: 'solicitudes',
                component: () => import('../components/FormularioSolicitud.vue')
            },
            {
                path: 'historial-solicitudes',
                name: 'historial',
                component: () => import('../components/TablaHistorial.vue')
            },

        ],
        meta: { requiresAuth: true, role: 3 },
        exact: true
    },

]; */

const studentsRoutes = [
    {
        path: '/dashboard-estudiante',
        name: 'dashboard-estudiante',
        component: () => import('../view/DashboardEstudianteView.vue'),
        redirect: { name: 'solicitudes' },
        children: [
            {
                path: 'solicitar-habilitacion',
                name: 'solicitudes',
                component: () => import('../view/RequestView.vue')
            },
            {
                path: 'historial-solicitudes',
                name: 'historial',
                component: () => import('../view/HistoryRequestView.vue')
            },

        ],
        meta: { requiresAuth: true, role: 3 },
        exact: true
    },

];



export default studentsRoutes;