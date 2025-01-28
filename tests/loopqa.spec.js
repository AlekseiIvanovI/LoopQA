const { test, expect } = require('@playwright/test');

// Data-driven test cases
const defineTestCases = [
    {
        description: 'Test 1: Verify Web Application To Do - Implement user authentication',
        application: 'Web Application',
        column: 'To Do',
        task: 'Implement user authentication',
        tags: ['Feature', 'High Priority']
    },
    {
        description: 'Test 2: Verify Web Application To Do - Fix navigation bug',
        application: 'Web Application',
        column: 'To Do',
        task: 'Fix navigation bug',
        tags: ['Bug']
    },
    {
        description: 'Test 3: Verify Web Application In Progress - Design system updates',
        application: 'Web Application',
        column: 'In Progress',
        task: 'Design system updates',
        tags: ['Design']
    },
    {
        description: 'Test 4: Verify Mobile Application To Do - Push notification system',
        application: 'Mobile Application',
        column: 'To Do',
        task: 'Push notification system',
        tags: ['Feature']
    },
    {
        description: 'Test 5: Verify Mobile Application In Progress - Offline mode',
        application: 'Mobile Application',
        column: 'In Progress',
        task: 'Offline mode',
        tags: ['Feature', 'High Priority']
    },
    {
        description: 'Test 6: Verify Mobile Application Done - App icon design',
        application: 'Mobile Application',
        column: 'Done',
        task: 'App icon design',
        tags: ['Design']
    }
];

// Generate tests
for (const testCase of defineTestCases) {
    test(testCase.description, async ({ page }) => {
        await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

        // Fill in username and password
        await page.locator("#username").fill('admin');
        await page.locator("#password").fill('password123');

        // Click the "Sign in" button
        await page.getByRole('button', { name: 'Sign in' }).click();

        // Navigate to the specified application
        await page.locator(`//button//h2[text()='${testCase.application}']`).click();

        // Verify the task is in the correct column
        await expect(page.locator(`//div//h2[text()='${testCase.column}']`)).toContainText(testCase.column);
        await expect(page.locator(`//h3[text()='${testCase.task}']`)).toHaveText(testCase.task);

        // Confirm all specified tags are visible
        for (const tag of testCase.tags) {
            await expect(page.locator(`//h3[text()='${testCase.task}']/following-sibling::div//span[text()='${tag}']`)).toBeVisible();
        }
    });
}