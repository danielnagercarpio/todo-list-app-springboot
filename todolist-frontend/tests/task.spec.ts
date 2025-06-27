import { test, expect } from '@playwright/test';

test('should close the add task modal when cancel is clicked', async ({ page }) => {
  await page.goto('http://localhost:4200/create-task');
  await expect(page).toHaveTitle('Create Task');
  await page.getByText('Añadir tarea').click();
  await expect(page.locator('.modal-open')).toBeVisible();
  await page.click('.close-modal');
  await expect(page.locator('.modal-open')).not.toBeVisible();
  await expect(page.locator('app-create-task')).toHaveCount(1);
});

test('should save and show data in grid when save button is clicked', async ({ page }) => {
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
    await page.getByText('Añadir tarea').click();
    await expect(page.locator('.modal-open')).toBeVisible();
    await page.click('#task-title');
    await page.keyboard.type('Tarea 3');
    await page.click('.button-primary');
    await expect(page.locator('text=Tarea 3')).toBeVisible();
    await expect(page.locator('.modal-open')).not.toBeVisible();
    await expect(page.locator('app-create-task')).toHaveCount(1);
});

test('should save the item and show it in grid when task is edited', async ({ page }) => {
    let tasks = [
        { id: 1, title: 'Task 1', done: false },
        { id: 2, title: 'Task 2', done: false },
    ];

    /*

    Debug requests

    page.on('request', req => {
        console.log('REQ:', req.method(), req.url());
    });

    */


    // findAll method called onRefresh
    await page.route('**/todo**', async(route) => {
        const req = route.request();
        if (req.method() === 'GET') {    
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(tasks),
            });
        } else {
            await route.continue();
        }
    })

    // edit method called onEdit
    await page.route('**/todo/**', async (route) => {
        const req = route.request();
        if (req.method() === 'PUT') {
            const body = route.request().postData();
            const postData = body ? JSON.parse(body) : {};
            const id = Number(req.url().split('/').pop());
            const idx = tasks.findIndex(t => t.id === id);

            if (idx !== -1) {
                tasks[idx] = {
                    id,
                    title: postData.title,
                    done: postData.done,
                };
            }

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(tasks[idx]),
            });
        } else {
            await route.continue();
        }
    });

    await page.goto('http://localhost:4200/create-task');
    await expect(page).toHaveTitle('Create Task');
    await page.click('.task-list-item-edit');
    await expect(page.locator('.modal-open')).toBeVisible();
    await page.fill('#task-title','');
    await page.keyboard.type('Edited Task Working');
    await page.selectOption('select#task-completed', { index: 0 });

    await expect(page.locator('#edit_save')).toBeVisible();
    await expect(page.locator('#edit_save')).toBeEnabled();
    await page.click('#edit_save');
        
    // Check edited item appear in task list
    const appTaskList = page.locator('app-task-list')
    await expect(appTaskList).toContainText('Edited Task Working')
    await expect(appTaskList).toHaveCount(1)
    await expect(page.locator('#marked-checkbox')).toBeVisible();
    await expect(page.locator('.modal-open')).not.toBeVisible();
    await expect(page.locator('app-create-task')).toHaveCount(1);
});