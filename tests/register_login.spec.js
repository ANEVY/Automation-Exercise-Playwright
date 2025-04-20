import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { AccountCreatedPage } from "../pages/AccountCreatedPage";
import { HeaderNavigations } from "../pages/HeaderNavigations";
import {
  validUser,
  invalidUser,
  userProfile,
  staticContents,
} from "../data/test_data";

test.describe("Login Page Tests", () => {
  let loginPage;
  let headerNavigations;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    headerNavigations = new HeaderNavigations(page);
    await loginPage.goto();
  });

  test.only("Test Case 1: Register User", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    await headerNavigations.gotoLogin();
    //Verify 'New User Signup!' is visible
    await loginPage.assertSignupTitleIsVisible();
    //Enter name and email address
    await loginPage.signup(userProfile.firstName, userProfile.email);
    //Click 'Signup' button
    //Verify that 'Account Created!' is visible
    await loginPage.asserLoginTitleIsVisible();
    // await loginPage.signup("U0X9K@example.com", "password");
  });

  test("Login with valid credentials", async ({ page }) => {
    await loginPage.login("U0X9K@example.com", "password");
  });

  test("Login with invalid credentials", async ({ page }) => {
    await loginPage.login("invalid-email", "invalid-password");
  });
});
