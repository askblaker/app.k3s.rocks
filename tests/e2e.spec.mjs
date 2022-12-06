import { expect, test } from "@playwright/test";

test("E2E with password", async ({ page }) => {
  await page.goto("/servers");
  await page.locator("text=add").click();
  await page.fill("#name", "Test server");
  await page.fill("#username", "test");
  await page.fill("#password", "test");
  await page.fill("#port", "5555");
  await page.fill("#ip", "0.0.0.0");
  await page.locator('#servermodal button:text("ok")').click();
  await page.keyboard.press("Escape");

  await page.goto("/tools");
  await expect(page.locator("#terminal")).not.toContainText("ubuntu");
  await page.locator("#server-select").click();
  await page.locator('li[role="option"]:has-text("Test server")').click();
  await page.locator("text=update").click();
  await expect(page.locator("#terminal")).toContainText("ubuntu", {
    timeout: 1000,
  });
});
