import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry : resolve(__dirname, 'src/main.ts'),
            name: 'QuillJsLib',
            formats: ['iife'],
            fileName: (format) => `quill.${format}.min.js`,
        },
    },
});