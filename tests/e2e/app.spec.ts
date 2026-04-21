import { test, expect } from '@playwright/test';

test.describe('Cards Application', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('app-root')).toBeVisible();
  });

  test('should display 3 cards', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('app-card');
    await expect(cards).toHaveCount(3);
  });

  test('should display first card with correct title', async ({ page }) => {
    await page.goto('/');
    const firstCardTitle = page.locator('app-card .title.is-4').first();
    await expect(firstCardTitle).toContainText('Neat Tree');
  });
});
