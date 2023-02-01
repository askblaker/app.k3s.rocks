import { expect, test } from "@playwright/test";

test("Custom 404 page", async ({ page }) => {
  await page.goto("/someweirdlinke");
  await expect(page.locator("h1")).toContainText("404");
});
