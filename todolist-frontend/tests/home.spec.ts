// tests/home.spec.ts
import { test, expect } from '@playwright/test';

test('should load application', async ({ page }) => {
  await page.goto('http://localhost:4200/create-task');

  await expect(page).toHaveTitle('Create Task');

  await expect(page.locator('app-create-task')).toHaveCount(1);
});
