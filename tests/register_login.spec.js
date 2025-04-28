import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AccountCreatedPage from "../pages/AccountCreatedPage";
import HeaderNavigations from "../pages/HeaderNavigations";
import AcccountDeletedPage from "../pages/AccountDeletedPage";
import Helpers from "../utils/Helpers";
import ContactUsPage from "../pages/ContactUsPage";
import {
  invalidUser,
  userProfile,
  staticContents,
  contactForm,
} from "../data/test_data";

//Registration
test.describe("Automation exercise test cases", () => {
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

  test("Test Case 5: Register User with existing email", async ({ page }) => {
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

//Contact page
test.describe("Contact Us Tests", () => {
  let loginPage;
  let headerNavigations;
  let signUpPage;
  let accountCreatedPage;
  let accountDeletedPage;
  let contactUsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    headerNavigations = new HeaderNavigations(page);
    signUpPage = new SignUpPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    accountDeletedPage = new AcccountDeletedPage(page);
    contactUsPage = new ContactUsPage(page);

    //Navigate to home page
    await headerNavigations.openHomePage();
  });

  test("Test Case 6: Contact Us Form", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    await headerNavigations.contactPage.click();

    //Verify 'GET IN TOUCH' is visible
    await expect(contactUsPage.getIntouch).toBeVisible();
    await expect(contactUsPage.getIntouch).toHaveText(
      staticContents.contactPage.getIntouch
    );

    //6Enter name, email, subject and message
    await contactUsPage.contactUs(
      contactForm.name,
      contactForm.email,
      contactForm.subject,
      contactForm.message
    );
    //Verify success message
    await expect(contactUsPage.successAlert).toBeVisible();
    await expect(contactUsPage.successAlert).toHaveText(
      staticContents.contactPage.successAlert
    );
    // navigate to the home page
    await headerNavigations.gotoHome();
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
  });
  test.only("Test Case 7: Verify Test Cases Page", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    // Click on 'Test Cases' button
    await headerNavigations.gotoTestCases();
    //Verify user is navigated to test cases page successfully
    await expect(page).toHaveTitle(staticContents.testCasesPageTitle);
  });
});
