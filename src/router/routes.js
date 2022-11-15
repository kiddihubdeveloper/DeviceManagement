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
                path: '/category',
                name: 'Key Search',
                component: load('device/DevicePage'),
                props: route => ({ query: route.query.categoryId })
            },
            {
                path: '/user',
                name: 'user',
                component: load('user/UserPage'),
            },
            {
                path: '/device-category',
                name: 'Device Category',
                component: load('deviceCategory/DeviceCategoryPage'),
            },
            {
                path: '/create-device-category',
                name: 'Create Device Category',
                component: load('deviceCategory/CreateDeviceCategory'),
            },
            {
                path: '/edit-device-category/:id',
                name: 'Edit Device Category',
                component: load('deviceCategory/EditDeviceCategory'),
            },
            {
                path: '/user-detail/:id',
                name: 'user-detail',
                component: load('user/UserDetailPage'),

            },
            {
                path: '/:pathMatch(.*)*',
                component: load('NotFoundPage'),
            }
           
        ],
    },
];

export default routes;
