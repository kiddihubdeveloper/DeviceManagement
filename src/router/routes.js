import DefaultLayout from '@/layouts/DefaultLayout.vue'

function load(component) {
    return () => import(/* webpackChunkName: "[request]" */ `../views/${component}.vue`)
}

const routes = [
    {
        path: '',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/',
                name: 'Home',
                component: load('HomePage'),
            },
            {
                path: '/create-device',
                name: 'CreateDevice',
                component: load('device/CreateDevice'),
            },
            {
                path: '/user',
                name: 'user',
                component: load('user/UserPage'),
            },
            {
                path: '/:pathMatch(.*)*',
                component: load('NotFoundPage'),
            }
           
        ],
    },
];

export default routes;
