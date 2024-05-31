import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";
const SEARCH_URL = `${UI_URL}/search/valby`;

test.describe("Search Events", () => {
  test("should load search page after city 'valby'", async ({ page }) => {
    await page.goto(SEARCH_URL);

    await expect(page).toHaveURL(SEARCH_URL);
    await expect(
      page.getByPlaceholder("Søg efter type af event")
    ).toBeVisible();
  });

  test("should display results for a search query", async ({ page }) => {
    await page.goto(SEARCH_URL);

    // Waiting for the search bar to be visible
    await page.waitForSelector('input[placeholder="Søg efter type af event"]', {
      state: "visible",
    });

    // Filling in the search query
    await page
      .locator('input[placeholder="Søg efter type af event"]')
      .fill("konkurrence");

    // Clicking the search button
    await page.locator('button:has-text("Søg")').click();

    // Verifying that the results are displayed
    await page.waitForSelector("#card-content", {
      state: "visible",
      timeout: 60000,
    });
    await expect(page.locator("#card-content")).toBeVisible();

    // Optionally verifying specific results
    await expect(page.getByText("Konkurrence", { exact: false })).toBeVisible();
  });
});
