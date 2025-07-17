import { defineConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig as defineVitestConfig } from 'vitest/config';

export default mergeConfig(
  defineConfig({ plugins: [react()] }),
  defineVitestConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './vitest.setup.ts',
    },
  })
);
