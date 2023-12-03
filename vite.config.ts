/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        include:['./tests/**/*.test.tsx'],
        // testMatch: ['./tests/**/*.test.tsx'],
        globals: true
    }
})
