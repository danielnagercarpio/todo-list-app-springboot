import { test, expect } from '@playwright/test';

test('should close the modal when cancel is clicked', async ({ page }) => {
  await page.goto('http://localhost:4200/create-task');
  await expect(page).toHaveTitle('Create Task');
  await page.getByText('Add Task').click();
  await expect(page.locator('.modal-open')).toBeVisible();
  await page.click('.close-modal');
  await expect(page.locator('.modal-open')).not.toBeVisible();
  await expect(page.locator('app-create-task')).toHaveCount(1);
});

test('should close the modal when save is clicked then task is loaded in the grid', async ({ page }) => {
    let tasks = [
        { id: 1, title: 'Tarea 1', done: false },
        { id: 2, title: 'Tarea 2', done: true },
    ];
    
    await page.route('**/todo**', async (route) => {
        const req = route.request();
        if (req.method() === 'GET') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(tasks),
            });
        } else if (req.method() === 'POST') {
            const body = route.request().postData();
            const postData = body ? JSON.parse(body) : {};
            const nuevaTarea = {
                    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                    title: postData.title,
                    done: true,
            };

            tasks.push(nuevaTarea);

            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify(nuevaTarea),
            });
        } else {
            await route.continue();
        }
    });

    await page.goto('http://localhost:4200/create-task');
    await expect(page).toHaveTitle('Create Task');
    await page.getByText('Add Task').click();
    await expect(page.locator('.modal-open')).toBeVisible();
    await page.click('#task-title');
    await page.keyboard.type('Tarea 3');
    await page.click('.button-primary');
    await expect(page.locator('text=Tarea 3')).toBeVisible();
    await expect(page.locator('.modal-open')).not.toBeVisible();
    await expect(page.locator('app-create-task')).toHaveCount(1);
});
