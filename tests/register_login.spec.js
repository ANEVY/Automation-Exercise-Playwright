import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AccountCreatedPage from "../pages/AccountCreatedPage";
import HeaderNavigations from "../pages/HeaderNavigations";
import AcccountDeletedPage from "../pages/AccountDeletedPage";
import Helpers from "../utils/Helpers";
import { invalidUser, userProfile, staticContents } from "../data/test_data";

test.describe("Login Page Tests", () => {
  let loginPage;
  let headerNavigations;
  let signUpPage;
  let accountCreatedPage;
  let accountDeletedPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    headerNavigations = new HeaderNavigations(page);
    signUpPage = new SignUpPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    accountDeletedPage = new AcccountDeletedPage(page);

    //Navigate to home page
    await headerNavigations.openHomePage();
  });

  test("Test Case 1: Register User", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    await headerNavigations.gotoLogin();
    //Verify 'New User Signup!' is visible
    let signupHeader = await loginPage.getSignupHeader();
    await expect(signupHeader).toBeVisible();
    await expect(signupHeader).toHaveText(staticContents.signUpHeader);
    //Register user
    await Helpers.registerUser(
      page,
      headerNavigations,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    //delete user
    await Helpers.deleteUserAccount(headerNavigations, accountDeletedPage);
  });

  test("Test Case 2: Login User with correct email and password", async ({
    page,
  }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    Helpers.verifyLoginHeader(headerNavigations, loginPage);
    //register user
    await Helpers.registerUser(
      page,
      headerNavigations,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    //logout user
    await headerNavigations.logout.click();

    //Click on 'Signup / Login' button
    await Helpers.verifyLoginHeader(headerNavigations, loginPage);

    //Login with valid credentials
    await loginPage.login(userProfile.email, userProfile.password);

    //delete user
    await Helpers.deleteUserAccount(headerNavigations, accountDeletedPage);
  });
  test("Test Case 3: Login User with incorrect email and password", async ({
    page,
  }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    Helpers.verifyLoginHeader(headerNavigations, loginPage);
    //Login with valid credentials
    await loginPage.login(invalidUser.email, invalidUser.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      staticContents.loginErrorMessage
    );
  });

  test("Test Case 4: Logout User", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    Helpers.verifyLoginHeader(headerNavigations, loginPage);
    //register user
    await Helpers.registerUser(
      page,
      headerNavigations,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    //logout user
    await headerNavigations.logout.click();

    //Click on 'Signup / Login' button
    await Helpers.verifyLoginHeader(headerNavigations, loginPage);

    //Login with valid credentials
    await loginPage.login(userProfile.email, userProfile.password);

    //logout user
    await headerNavigations.logout.click();
  });

  test.only("Test Case 5: Register User with existing email", async ({
    page,
  }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    await headerNavigations.gotoLogin();
    //Verify 'New User Signup!' is visible
    let signupHeader = await loginPage.getSignupHeader();
    await expect(signupHeader).toBeVisible();
    await expect(signupHeader).toHaveText(staticContents.signUpHeader);
    //register user
    //Enter name and email address and click on sign up button
    await loginPage.signup(userProfile.firstName, userProfile.email);

    await expect(loginPage.signupErrorMessage).toBeVisible();
    await expect(loginPage.signupErrorMessage).toHaveText(
      staticContents.existingEmailErrorMessage
    );
  });
});
