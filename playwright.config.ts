import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  expect: { timeout: 500 },
  use: {
    baseURL: "http://localhost:3000/",
    actionTimeout: 1 * 1000,
    navigationTimeout: 5 * 1000,
  },
  webServer: {
    command: "yarn start",
    port: 3000,
    timeout: 10 * 1000,
    reuseExistingServer: !process.env.CI,
  },
};
export default config;
