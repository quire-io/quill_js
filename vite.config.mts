import { resolve } from 'path';
import { defineConfig } from 'vite';

const version = require('./package.json').version;

export default defineConfig({
    build: {
        lib: {
            entry : resolve(__dirname, 'src/main.ts'),
            name: 'QuillJsLib',
            formats: ['umd'],
            fileName: (format) => `quill-${version}.${format}.min.js`,
        },
        rollupOptions: {
            external: ['highlight.js'],
            output: {
                globals: {
                    'highlight.js': 'hljs',
                },
            },
        },
    },
});