import { expect, test } from "@playwright/test";

test("Test keys page", async ({ page }) => {
  await page.goto("/sshkeys");
  await expect(page.locator("body")).not.toContainText("Delete");
  await page.locator("text=Add").click();
  await page.locator('h2:has-text("Add SSH Key")').waitFor();
  await page.fill("#name", "Peter");
  await page.fill("#key", "123456");
  await page.locator('#sshmodal button:text("Add")').click();
  await page.keyboard.press("Escape");
  await page.locator("text=Delete").waitFor();
  await page.locator("text=Delete").click();
  await expect(page.locator("body")).not.toContainText("Delete");
});
