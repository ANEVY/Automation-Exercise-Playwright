import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AccountCreatedPage from "../pages/AccountCreatedPage";
import HeaderAndFooter from "../pages/HeaderAndFooter";
import AcccountDeletedPage from "../pages/AccountDeletedPage";
import Helpers from "../utils/Helpers";
import ContactUsPage from "../pages/ContactUsPage";
import ProductsPage from "../pages/ProductsPage";
import CartAndCheckout from "../pages/CartAndCheckout";
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
    headerNavigations = new HeaderAndFooter(page);
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
  let headerAndFooter;
  let signUpPage;
  let accountCreatedPage;
  let accountDeletedPage;
  let contactUsPage;
  let productsPage;
  let cartAndCheckout;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    headerAndFooter = new HeaderAndFooter(page);
    signUpPage = new SignUpPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    accountDeletedPage = new AcccountDeletedPage(page);
    contactUsPage = new ContactUsPage(page);
    productsPage = new ProductsPage(page);
    cartAndCheckout = new CartAndCheckout(page);
    //Navigate to home page
    await headerAndFooter.openHomePage();
  });
  test("Test Case 6: Contact Us Form", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    await headerAndFooter.contactPage.click();

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
    await headerAndFooter.gotoHome();
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
  });
  test("Test Case 7: Verify Test Cases Page", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    // Click on 'Test Cases' button
    await headerAndFooter.gotoTestCases();
    //Verify user is navigated to test cases page successfully
    await expect(page).toHaveTitle(staticContents.testCasesPageTitle);
  });
  test("Test Case 8: Verify All Products and product detail page", async ({
    page,
  }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Products' button
    await headerAndFooter.gotoProducts();
    //5. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveTitle(staticContents.productsPage.pageTitle);
    //verify that all cards are visible
    await expect(productsPage.productCards).toHaveCount(
      staticContents.productsPage.totalProductCards
    );
    //Click on 'View Product' of first product
    let productCards = await productsPage.productCards.all();
    await productCards[0].locator("ul.nav li a").click();

    // Sleep for 2 seconds
    await page.waitForTimeout(2000);

    // Verify that detail detail is visible: product name, category, price, availability, condition, brand
    await expect(productsPage.productName).toBeVisible();
    await expect(productsPage.productCategory).toBeVisible();
    await expect(productsPage.productPrice).toBeVisible();
    await expect(productsPage.productCondition).toBeVisible();
    await expect(productsPage.productAvailability).toBeVisible();
    await expect(productsPage.productBrand).toBeVisible();
  });
  test("Test Case 9: Search Product", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Products' button
    await headerAndFooter.gotoProducts();
    //5. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveTitle(staticContents.productsPage.pageTitle);
    //Enter product name in search input and click search button
    await productsPage.searchProducts.fill(
      staticContents.productsPage.productName
    );
    await productsPage.submitSearch.click();

    await expect(productsPage.searchedProducts).toBeVisible();

    await expect(productsPage.productCards).toHaveCount(
      staticContents.productsPage.totalSearchResult
    );
  });
  test("Test Case 10: Verify Subscription in home page", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    // Scroll down to footer
    await headerAndFooter.footer.scrollIntoViewIfNeeded();
    //Verify text 'SUBSCRIPTION'
    await expect(headerAndFooter.subscriptionHeader).toBeVisible();
    await expect(headerAndFooter.subscriptionHeader).toHaveText(
      staticContents.subscriptionTitle
    );
    //Enter email address in input and click arrow button
    await headerAndFooter.subscriptionEmail.fill(userProfile.email);
    await headerAndFooter.subscriptionButton.click();

    //. Verify success message 'You have been successfully subscribed!' is visible
    await expect(headerAndFooter.subscriptionButton).toBeVisible();
  });
  test("Test Case 11: Verify Subscription in Cart page", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    // Click 'Cart' button
    await headerAndFooter.gotoCart();
    // Scroll down to footer
    await headerAndFooter.footer.scrollIntoViewIfNeeded();
    //Verify text 'SUBSCRIPTION'
    await expect(headerAndFooter.subscriptionHeader).toBeVisible();
    await expect(headerAndFooter.subscriptionHeader).toHaveText(
      staticContents.subscriptionTitle
    );
    //Enter email address in input and click arrow button
    await headerAndFooter.subscriptionEmail.fill(userProfile.email);
    await headerAndFooter.subscriptionButton.click();

    //. Verify success message 'You have been successfully subscribed!' is visible
    await expect(headerAndFooter.subscriptionButton).toBeVisible();
  });

  test.only("Test Case 12: Add Products in Cart", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    // 4. Click 'Products' button
    await headerAndFooter.gotoProducts();

    let productCards = await productsPage.productCards.all();
    let firstProduct = productCards[0];
    let secondProduct = productCards[1];
    //Hover over first product and click 'Add to cart'
    await firstProduct.hover();
    await firstProduct.locator(".overlay-content a.add-to-cart").click();

    //Click 'Continue Shopping' button
    await expect(productsPage.cartModal).toBeVisible();
    await productsPage.continueShopping.click();

    //Hover over first product and click 'Add to cart'
    await secondProduct.hover();
    await secondProduct.locator(".overlay-content a.add-to-cart").click();
    await page.waitForTimeout(2000);
    // Click 'View Cart' button
    await expect(productsPage.cartModal).toBeVisible();
    await productsPage.viewCartButton.click();

    //Verify both products are added to Cart
    await expect(cartAndCheckout.tableBodyRows).toHaveCount(2);
    //Verify their prices, quantity and total price
    const cartProducts = await cartAndCheckout.tableBodyRows.all();
    //product1
    let product1 = cartProducts[0];

    let product1Price = await product1.locator(".cart_price p").textContent();
    let product1Quantity = await product1
      .locator(".cart_quantity button")
      .textContent();
    let product1TotalPrice = await product1
      .locator(".cart_total p")
      .textContent();

    // product 2
    let product2 = cartProducts[1];
    let product2Price = await product2.locator(".cart_price p").textContent();
    let product2Quantity = await product2
      .locator(".cart_quantity button")
      .textContent();
    let product2TotalPrice = await product2
      .locator(".cart_total p")
      .textContent();

    //validate product 1
    expect(product1Price).toBe(
      staticContents.productsPage.products.product1.price
    );
    expect(product1Quantity).toBe(
      staticContents.productsPage.products.product1.cartQuantity
    );
    expect(product1TotalPrice).toBe(
      staticContents.productsPage.products.product1.cartPrice
    );

    //validate product 2
    expect(product2Price).toBe(
      staticContents.productsPage.products.product2.price
    );
    expect(product2Quantity).toBe(
      staticContents.productsPage.products.product2.cartQuantity
    );
    expect(product2TotalPrice).toBe(
      staticContents.productsPage.products.product2.cartPrice
    );
  });
});
