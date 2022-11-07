import {createVuePlugin} from 'vite-plugin-vue2';
import viteComponents, {VuetifyResolver,} from 'vite-plugin-components';
import dynamicImport from 'vite-plugin-dynamic-import'
import path from 'path';

export default {
    resolve: {
        extensions: [
            ".mjs",
            ".js",
            ".ts",
            ".jsx",
            ".tsx",
            ".json",
            ".vue",
            ".scss",
        ],
        alias: [
            {
                find: '@/',
                replacement: `${path.resolve(__dirname, './src')}/`,
            },
            {
                find: 'src/',
                replacement: `${path.resolve(__dirname, './src')}/`,
            },
        ],
    },
    plugins: [
        createVuePlugin(),
        viteComponents({
            customComponentResolvers: [
                VuetifyResolver(),
            ],
        }),
        dynamicImport()
    ],
    envPrefix: 'KIDDIHUB_DM_',
    server: {
        host: '0.0.0.0',
        port: 8080,
    },
    css: {
        preprocessorOptions: {
            sass: {
                additionalData: [
                    // vuetify variable overrides
                    '@import "@/assets/styles/variables"',
                    '',
                ].join('\n'),
            },
        },
    },
};
