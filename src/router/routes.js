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
                path: '/',
                name: 'Device',
                component: load('device/DevicePage'),
            },
            {
                path: '/create-device',
                name: 'Create Device',
                component: load('device/CreateDevice'),
            },
            {
                path: '/edit-device/:id',
                name: 'Edit Device',
                component: load('device/EditDevice'),
            },
            {
                path: '/search',
                name: 'Key Search',
                component: load('device/DevicePage'),
                props: route => ({ query: route.query.deviceName })
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
