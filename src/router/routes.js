import DefaultLayout from '@/layouts/DefaultLayout.vue'

function load(component) {
    return () => import(/* webpackChunkName: "[request]" */ `@/views/${component}.vue`)
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
                path: '/:pathMatch(.*)*',
                component: load('NotFoundPage'),
            },
        ],
    },
];

export default routes;
