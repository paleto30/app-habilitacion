

// rutas para el modulo de dashboard-super
const superRoutes = [
	{
		path: '/dashboard-super',
		name: 'dashboard-super',
		component: () => import('../views/DashboardSuperAdmin.vue'),
		meta: { requiresAuth: true, role: 1 }
	}
];



export default superRoutes;