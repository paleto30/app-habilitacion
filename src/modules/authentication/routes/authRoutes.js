

const authRutes = [
    {
        path: '/authentication',
        name: 'authentication',
        redirect: '/authentication/login',
        component: () => import('../views/authenticationView.vue'),
        children: [
            {
                path: 'login',
                component: () => import('../components/FormLogin.vue'),
                name: 'login',
            },
            {
                path: 'register',
                component: () => import('../components/FormRegister.vue'),
                name: 'register',
            },
            {
                name: 'admin',
                path: 'admin/view/register',
                component: () => import('../components/FormRegisterAdmin.vue')
            }
        ]
    }
];





export default authRutes;

