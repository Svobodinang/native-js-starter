import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import pugPlugin from 'vite-plugin-pug';

import meta from './src/config/meta.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    root: 'src/templates',
    plugins: [
        pugPlugin({}, { meta }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/templates/index.html'),
                about: resolve(__dirname, 'src/templates/about.html'),
            },
        },
    },
});