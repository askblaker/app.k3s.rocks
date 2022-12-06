import { expect, test } from "@playwright/test";

test("Test servers page", async ({ page }) => {
  await page.goto("/servers");
  await page.locator("text=Add").click();
  await page.fill("#name", "Test server");
  await page.fill("#username", "test");
  await page.fill("#password", "test");
  await page.fill("#ip", "0.0.0.0");
  await page.locator('#servermodal button:text("ok")').click();
  await page.keyboard.press("Escape");
  await page.locator("text=Delete").waitFor();
  await page.locator("text=Delete").click();
  await expect(page.locator("body")).not.toContainText("Delete");
});
