import DefaultLayout from '@/layouts/DefaultLayout.vue'

function load(component) {
    return () => import(/* webpackChunkName: "[request]" */ `../views/${component}.vue`)
}

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: load('auth/LoginPage'),
        meta: {requiresAdminAuth: false}
    },
    {
        path: '/logout',
        name: 'Logout',
        component: load('auth/Logout'),
        meta: {requiresAdminAuth: false}
    },
    {
        path: '',
        component: DefaultLayout,
        meta: {requiresAdminAuth: false},
        children: [
            {
                path: '/',
                name: 'Home',
                component: load('HomePage'),
                meta: {requiresAdminAuth: false},
            },
            {
                path: '/',
                name: 'Device',
                component: load('device/DevicePage'),
                meta: {requiresAdminAuth: false},
            },
            {
                path: '/create-device',
                name: 'Create Device',
                component: load('device/CreateDevice'),
                meta: {requiresAdminAuth: false},
            },
            {
                path: '/edit-device/:id',
                name: 'Edit Device',
                component: load('device/EditDevice'),
                meta: {requiresAdminAuth: false},
            },
            {
                path: '/category',
                name: 'Key Search',
                component: load('device/DevicePage'),
                props: route => ({query: route.query.categoryId}),
                meta: {requiresAdminAuth: false},
            },
            {
                path: '/user',
                name: 'user',
                component: load('user/UserPage'),
                meta: {requiresAdminAuth: true},
            },
            {
                path: '/device-category',
                name: 'Device Category',
                component: load('deviceCategory/DeviceCategoryPage'),
                meta: {requiresAdminAuth: false},
            },
            {
                path: '/create-device-category',
                name: 'Create Device Category',
                component: load('deviceCategory/CreateDeviceCategory'),
                meta: {requiresAdminAuth: false},
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
                meta: {requiresAdminAuth: false},
            },
            {
                path: '/:pathMatch(.*)*',
                component: load('NotFoundPage'),
            }
           
        ],
    },
];

export default routes;
