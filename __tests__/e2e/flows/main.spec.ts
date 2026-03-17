import { test, expect, type Page } from '@playwright/test';

// ─── Auth helper ─────────────────────────────────────────────────────────────

async function login(page: Page) {
  await page.goto('/en/auth');

  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');

  await emailInput.waitFor({ state: 'visible' });

  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  
  console.log('EMAIL З ENV:', process.env.TEST_USER_EMAIL);
  if (!email || !password) {
    throw new Error('Playwright not found TEST_USER_EMAIL or TEST_USER_PASSWORD in environment variables!');
  }

  await emailInput.fill(email);
  await passwordInput.fill(password);

  await page.locator('button[type="submit"]').first().click();


  await page.waitForURL(/\/en$/);
}

// ─── Authenticated flows ──────────────────────────────────────────────────────

test.describe('Authenticated flows', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display the list of items (teams) on the main page', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'English Premier League' })
    ).toBeVisible();

    await expect(page.locator('[data-slot="card"]').first()).toBeVisible();
  });

  test('should navigate to item details page when clicked', async ({ page }) => {
    const firstCard = page.locator('[data-slot="card"]').first();
    await expect(firstCard).toBeVisible();
    await firstCard.click();

    await expect(page).toHaveURL(/.*\/items\/\d+/);

    
    await expect(page.locator('a[href="/en"], a[href="/uk"]').first()).toBeVisible();
  });
});

// ─── Unauthenticated flows ───────────────────────────────────────────────────

test.describe('Unauthenticated flows', () => {
  test('should redirect unauthenticated user from protected list to login page', async ({ page }) => {
    await page.goto('/en');

    await expect(page).toHaveURL(/.*\/auth/);

    await expect(page.getByRole('tab', { name: /sign in|вхід|login/i }).first()).toBeVisible();
  });
});