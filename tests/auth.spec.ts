import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("button", { name: "Log ind" }).click();

  await expect(page).toHaveURL(/https:\/\/.*\.auth0\.com\/u\/login\?.*/);

  await page.waitForSelector("#username", { state: "visible", timeout: 60000 });

  await page.locator("#username").fill("louise@test.com");
  await page.locator("#password").fill("Test1234@");

  await page
    .locator('form button[type="submit"][name="action"][value="default"]')
    .click();

  await expect(page).toHaveURL(UI_URL);

  await expect(page.getByRole("link", { name: "Kontakt" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Tilmeldte aktiviteter" })
  ).toBeVisible();
});
