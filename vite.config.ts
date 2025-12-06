import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueFacingDecoratorHmr from "vite-plugin-vue-facing-decorator-hmr";

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    return {
        server: {
            port: parseInt(env.VITE_PORT, 10) || 3001,
            host: env.VITE_HOST || 'localhost',
        },
        optimizeDeps: {
            include: ['@yandex/ymaps3-core']
        },
        build: {
            rollupOptions: {
                external: ['@yandex/ymaps3-core']
            }
        },
        plugins: [
            vue(),
            vueDevTools(),
            vueFacingDecoratorHmr(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        }
    }
})
