// tests/home.spec.ts
import { test, expect } from '@playwright/test';

test('La aplicación se carga correctamente', async ({ page }) => {
  await page.goto('http://localhost:4200/create-task');

  // Verificamos que el título contenga "Todo"
  await expect(page).toHaveTitle('Create Task');

  // Verificamos que el componente raíz sea visible
  await expect(page.locator('app-create-task')).toHaveCount(1);
});
