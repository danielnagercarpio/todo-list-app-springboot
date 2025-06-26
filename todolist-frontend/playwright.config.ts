// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:4200',
    headless: false,
    slowMo: 500,
    viewport: { width: 1280, height: 720 },
  },
});
