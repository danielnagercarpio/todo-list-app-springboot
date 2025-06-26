// tests/home.spec.ts
import { test, expect } from '@playwright/test';


test('should close the modal when cancel is clicked', async ({ page }) => {
/*
    For future mocking

    let tareas = [
    { id: 1, title: 'Tarea 1', done: false },
    { id: 2, title: 'Tarea 2', done: true },
  ];
*/
//  await page.route('**/todo**', async (route) => {
  //  const req = route.request();
    //if (req.method() === 'GET') {
      //await route.fulfill({
       // status: 200,
       // contentType: 'application/json',
       // body: JSON.stringify(tareas),
      //});
//    } else if (req.method() === 'POST') {
  //    const postData = { id: 3, title: 'Tarea 3', completed: true };
    //  const nuevaTarea = {
      //  id: tareas.length ? tareas[tareas.length - 1].id + 1 : 1,
        //title: postData.title,
//        done: true,
  //    };

    //  tareas.push(nuevaTarea);

      //await route.fulfill({
       // status: 201,
       // contentType: 'application/json',
       // body: JSON.stringify(nuevaTarea),
     // });
   // } else {
    //  await route.continue();
   // }
//  });

  await page.goto('http://localhost:4200/create-task');
  await expect(page).toHaveTitle('Create Task');
  await page.getByText('Add Task').click();
  await expect(page.locator('.modal-open')).toBeVisible();
  await page.click('.close-modal');
  await expect(page.locator('.modal-open')).not.toBeVisible();
  await expect(page.locator('app-create-task')).toHaveCount(1);
});
