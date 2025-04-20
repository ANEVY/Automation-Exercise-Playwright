import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AccountCreatedPage from "../pages/AccountCreatedPage";
import HeaderNavigations from "../pages/HeaderNavigations";
import AcccountDeletedPage from "../pages/AccountDeletedPage";
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

  test.only("Test Case 1: Register User", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    await headerNavigations.gotoLogin();
    //Verify 'New User Signup!' is visible
    let signupHeader = await loginPage.getSignupHeader();
    await expect(signupHeader).toBeVisible();
    await expect(signupHeader).toHaveText(staticContents.signUpHeader);
    //Enter name and email address and click on sign up button
    await loginPage.signup(userProfile.firstName, userProfile.email);

    await expect(page).toHaveTitle(staticContents.signUpPageTitle);

    //Verify 'Enter Account Information' is visible
    let signUpAccountHeader = await signUpPage.getAccountHeader();
    await expect(signUpAccountHeader).toBeVisible();
    await expect(signUpAccountHeader).toHaveText(
      staticContents.signUpAccountHeader
    );
    // create account
    await signUpPage.createAccount(
      userProfile.title ?? "Mr",
      userProfile.firstName,
      userProfile.lastName,
      userProfile.password,
      userProfile.dateOfBirth.day,
      userProfile.dateOfBirth.month,
      userProfile.dateOfBirth.year,
      userProfile.company,
      userProfile.address,
      userProfile.address2,
      userProfile.city,
      userProfile.state,
      userProfile.zipCode,
      userProfile.phoneNumber,
      userProfile.country,
      true,
      true
    );
    //Verify that 'ACCOUNT CREATED!' is visible
    let accountCreatedHeader = await accountCreatedPage.getAccountHeader();
    await expect(accountCreatedHeader).toBeVisible();
    await expect(accountCreatedHeader).toHaveText(
      staticContents.accountCreatedPageHeader
    );

    //Click 'Continue' button
    await accountCreatedPage.clickContinueButton();

    //Verify that 'Logged in as username' is visible
    let loggedInUser = await headerNavigations.getLoggedInUser();
    await expect(loggedInUser).toBeVisible();
    await expect(loggedInUser).toContainText(userProfile.firstName);

    //Click 'Delete Account' button
    await headerNavigations.deleteAccount.click();

    //Verify that 'ACCOUNT DELETED!' is visible
    let accountDeletedHeader = await accountDeletedPage.getAccountHeader();
    await expect(accountDeletedHeader).toBeVisible();
    await expect(accountDeletedHeader).toHaveText(
      staticContents.accountDeletedPageHeader
    );

    //Click 'Continue' button
    await accountDeletedPage.clickContinueButton();
  });
});
