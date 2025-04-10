import { LoginPage } from "modules/LoginPage";
import { test, expect } from "@playwright/test";

test.describe("Login Page Tests", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("Login with valid credentials", async ({ page }) => {
    await loginPage.login("U0X9K@example.com", "password");
  });

  test("Login with invalid credentials", async ({ page }) => {
    await loginPage.login("invalid-email", "invalid-password");
  });
});
