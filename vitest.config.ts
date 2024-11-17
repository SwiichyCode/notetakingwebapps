import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/tests/setup-test-environment.ts'],
    include: ['./src/**/*.{spec,test}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [String.raw`.*\/node_modules\/.*`, String.raw`.*\/build\/.*`, String.raw`.*\/postgres-data\/.*`],
    watch: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
