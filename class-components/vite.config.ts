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
      include: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
      coverage: {
        provider: 'v8',
        exclude: [
          '**/node_modules/**',
          '**/index.{ts,tsx}',
          '**/*.d.ts',
          '**/*.config.{js,ts}',
          '**/setupTests.ts',
          '**/main.{ts,tsx}',
          '**/types.ts',
          '**/vite-env.d.ts',
          '.vite/**',
          'dist/**'
        ],
        all: false,
        thresholds: {
          global: {
            statements: 80,
            branches: 50,
            functions: 50,
            lines: 50,
          },
        },
      },
    },
  })
);
