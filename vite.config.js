import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import pugPlugin from 'vite-plugin-pug';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';

import meta from './src/config/meta.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export default defineConfig({
    base: "./",
    root: "./src",
    plugins: [
        pugPlugin({}, { meta, baseUrl: "/pages" }),
        eslint({
            cache: false,
            include: ['src/**/*.ts', 'src/**/*.js'],
            exclude: ['node_modules', 'dist'],
            emitWarning: true,
            emitError: true,
        }),
        stylelint({
            include: ['src/**/*.{css,scss,sass}'],
            exclude: ['node_modules', 'dist'],
            emitWarning: true,
            emitError: true,
            failOnError: false
        }),
        {
        name: 'remove-crossorigin',
            transformIndexHtml(html) {
                return html.replace(/\s+crossorigin/g, '');
            },
        },
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
                main: "./src/index.html",
                about: "./src/pages/about/index.html"
            }
        }
    }
})