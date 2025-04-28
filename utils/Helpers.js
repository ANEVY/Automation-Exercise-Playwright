import { invalidUser, userProfile, staticContents } from "../data/test_data";
import { expect } from "@playwright/test";

export default class Helpers {
  static async registerUser(
    page,
    headerNavigations,
    loginPage,
    signUpPage,
    accountCreatedPage
  ) {
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
  }

  static async deleteUserAccount(headerNavigations, accountDeletedPage) {
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
  }

  static async verifyLoginHeader(headerNavigations, loginPage) {
    //Click on 'Signup / Login' button
    await headerNavigations.gotoLogin();
    //Verify 'New User Signup!' is visible
    await expect(loginPage.loginHeader).toBeVisible();
    await expect(loginPage.loginHeader).toHaveText(staticContents.loginHeader);
  }
}
