import { expect, test } from "@playwright/test";

test("Pages have titles", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Home | app.k3s.rocks");

  await page.goto("/sshkeys");
  await expect(page).toHaveTitle("SSH Keys | app.k3s.rocks");

  await page.goto("/servers");
  await expect(page).toHaveTitle("Servers | app.k3s.rocks");

  await page.goto("/tools");
  await expect(page).toHaveTitle("Tools | app.k3s.rocks");

  await page.goto("/profile");
  await expect(page).toHaveTitle("Profile | app.k3s.rocks");
});
