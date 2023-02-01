import { test } from "@playwright/test";
import * as fs from "fs";

test("E2E with SSHKey", async ({ page }) => {
  var testKey = fs.readFileSync("../ssh_container/test", "utf-8");
  await page.goto("/sshkeys");
  await page.locator("text=add").click();
  await page.fill("#name", "testkey");
  await page.fill("#key", testKey);
  await page.locator('#sshmodal button:text("add")').click();
  await page.keyboard.press("Escape");

  await page.goto("/servers");
  await page.locator("text=Add").click();
  await page.fill("#name", "Test server 2");
  await page.fill("#username", "test");
  await page.fill("#password", "test");
  await page.fill("#port", "5555");
  await page.fill("#ip", "0.0.0.0");

  await page.locator("#useSSHKeyToggle").click();
  await page.locator("#ssh-select").click();
  await page.locator("text=testkey").click();
  await page.locator('#servermodal button:text("ok")').click();

  await page.keyboard.press("Escape");

  await page.goto("/tools");
  await page.locator("#server-select").click();
  await page.locator('li[role="option"]:has-text("Test server 2")').click();
  await page.locator('button:text("ls")').click();
});
