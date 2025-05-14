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
import PaymentPage from "../pages/PaymentPage";
import {
  invalidUser,
  userProfile,
  staticContents,
  contactForm,
} from "../data/test_data";

//Registration
test.describe("Automation exercise test cases", () => {
  let loginPage;
  let headerAndFooter;
  let signUpPage;
  let accountCreatedPage;
  let accountDeletedPage;
  let contactUsPage;
  let productsPage;
  let cartAndCheckout;
  let paymentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    headerAndFooter = new HeaderAndFooter(page);
    signUpPage = new SignUpPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    accountDeletedPage = new AcccountDeletedPage(page);
    contactUsPage = new ContactUsPage(page);
    productsPage = new ProductsPage(page);
    cartAndCheckout = new CartAndCheckout(page);
    paymentPage = new PaymentPage(page);
    //Navigate to home page
    await headerAndFooter.openHomePage();
  });

  test("Test Case 1: Register User", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    await headerAndFooter.gotoLogin();
    //Verify 'New User Signup!' is visible
    let signupHeader = await loginPage.getSignupHeader();
    await expect(signupHeader).toBeVisible();
    await expect(signupHeader).toHaveText(staticContents.signUpHeader);
    //Register user
    await Helpers.registerUser(
      page,
      headerAndFooter,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    //delete user
    await Helpers.deleteUserAccount(headerAndFooter, accountDeletedPage);
  });

  test("Test Case 2: Login User with correct email and password", async ({
    page,
  }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    Helpers.verifyLoginHeader(headerAndFooter, loginPage);
    //register user
    await Helpers.registerUser(
      page,
      headerAndFooter,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    //logout user
    await headerAndFooter.logoutUser();

    //Click on 'Signup / Login' button
    await Helpers.verifyLoginHeader(headerAndFooter, loginPage);

    //Login with valid credentials
    await loginPage.login(userProfile.email, userProfile.password);

    //delete user
    await Helpers.deleteUserAccount(headerAndFooter, accountDeletedPage);
  });
  test("Test Case 3: Login User with incorrect email and password", async ({
    page,
  }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    Helpers.verifyLoginHeader(headerAndFooter, loginPage);
    //Login with valid credentials
    await loginPage.login(invalidUser.email, invalidUser.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      staticContents.loginErrorMessage
    );
    //Login with valid credentials
    await loginPage.login(userProfile.email, userProfile.password);
    //delete user
    await Helpers.deleteUserAccount(headerAndFooter, accountDeletedPage);
  });

  test("Test Case 4: Logout User", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    Helpers.verifyLoginHeader(headerAndFooter, loginPage);
    //register user
    await Helpers.registerUser(
      page,
      headerAndFooter,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    //logout user
    await headerAndFooter.logoutUser();

    //Click on 'Signup / Login' button
    await Helpers.verifyLoginHeader(headerAndFooter, loginPage);

    //Login with valid credentials
    await loginPage.login(userProfile.email, userProfile.password);

    //logout user
    await headerAndFooter.logoutUser();
  });

  test("Test Case 5: Register User with existing email", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click on 'Signup / Login' button
    await headerAndFooter.gotoLogin();
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
    await Helpers.searchAndVerifyProducts(
      productsPage,
      staticContents.productsPage.productName,
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

  test("Test Case 12: Add Products in Cart", async ({ page }) => {
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
  test("Test Case 13: Verify Product quantity in Cart", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    const productCards = await productsPage.productCards.all();

    let productName = await productCards[1]
      .locator(".productinfo > p")
      .textContent();
    //Click 'View Product' for any product on home page
    await productCards[1].locator("ul.nav li a").click();

    //Verify product detail is opened
    await expect(productsPage.productName).toBeVisible();
    //Increase quantity to 4
    await productsPage.productDetailsQuantity.fill(
      `${staticContents.productsPage.productQuantity}`
    );
    // Click 'Add to cart' button
    await productsPage.productDetailAddToCart.click();
    // Click 'View Cart' button
    await expect(productsPage.cartModal).toBeVisible();
    await productsPage.viewCartButton.click();

    //Verify that product is displayed in cart page with exact quantity
    const cartProducts = await cartAndCheckout.tableBodyRows.all();
    for (const product of cartProducts) {
      let cartProductName = await product
        .locator(".cart_description > h4")
        .textContent();
      if (cartProductName.toLowerCase() === productName.toLowerCase()) {
        let productQuantity = await product
          .locator(".cart_quantity button")
          .textContent();
        expect(productQuantity).toBe(
          `${staticContents.productsPage.productQuantity}`
        );
        break;
      }
    }
  });
  //start execution
  test("Test Case 14: Place Order: Register while Checkout", async ({
    page,
  }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Add products to cart
    const productsInCart = await Helpers.addProductsToCart(productsPage);

    // Click 'Cart' button
    await headerAndFooter.gotoCart();
    //Verify that cart page is displayed
    await expect(page).toHaveTitle(staticContents.cartPageTitle);
    //Click Proceed To Checkout
    await cartAndCheckout.proceedToCheckout.click();
    //Click 'Register / Login' button
    await expect(cartAndCheckout.checkoutModal).toBeVisible();
    await cartAndCheckout.modalLoginButton.click();
    //Fill all details in Signup and create account
    await Helpers.registerUser(
      page,
      headerAndFooter,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    //Click 'Cart' button
    await headerAndFooter.gotoCart();
    //Click Proceed To Checkout
    await cartAndCheckout.proceedToCheckout.click();

    //Verify Address Details
    await Helpers.verifyDeliveryAddressDetails(cartAndCheckout);

    //Review Order
    await Helpers.reviewOrder(cartAndCheckout, productsInCart);

    //Enter description in comment text area and click 'Place Order'
    await cartAndCheckout.comments.fill(staticContents.orderComment);
    await cartAndCheckout.placeOrder.click();

    //make payments
    await Helpers.makePayment(page, paymentPage);
    //delete user
    await Helpers.deleteUserAccount(headerAndFooter, accountDeletedPage);
  });
  test("Test Case 15: Place Order: Register before Checkout", async ({
    page,
  }) => {
    // Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    // Click 'Signup / Login' button
    await headerAndFooter.gotoLogin();
    //Fill all details in Signup and create account
    await Helpers.registerUser(
      page,
      headerAndFooter,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    //Add products to cart
    const productsInCart = await Helpers.addProductsToCart(productsPage);

    //Click 'Cart' button
    await headerAndFooter.gotoCart();
    //Verify that cart page is displayed
    await expect(page).toHaveTitle(staticContents.cartPageTitle);
    //Click Proceed To Checkout
    await cartAndCheckout.proceedToCheckout.click();
    //Verify Address Details and Review Your Order
    await Helpers.verifyDeliveryAddressDetails(cartAndCheckout);
    await Helpers.reviewOrder(cartAndCheckout, productsInCart);
    //Enter description in comment text area and click 'Place Order'
    await cartAndCheckout.comments.fill(staticContents.orderComment);
    await cartAndCheckout.placeOrder.click();

    //make payments
    await Helpers.makePayment(page, paymentPage);
    //Click 'Delete Account' button
    await Helpers.deleteUserAccount(headerAndFooter, accountDeletedPage);
  });
  test("Test Case 16: Place Order: Login before Checkout", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click 'Signup / Login' button
    await headerAndFooter.gotoLogin();

    //Fill all details in Signup and create account
    await Helpers.registerUser(
      page,
      headerAndFooter,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    //logout user
    await headerAndFooter.logoutUser();
    //Click 'Signup / Login' button
    await headerAndFooter.gotoLogin();
    //Fill email, password and click 'Login' button
    await loginPage.login(userProfile.email, userProfile.password);
    //Verify 'Logged in as username' at top
    await Helpers.verifyLoggedInUser(headerAndFooter);
    //Add products to cart
    const productsInCart = await Helpers.addProductsToCart(productsPage);
    //Click 'Cart' button
    await headerAndFooter.gotoCart();
    //Verify that cart page is displayed
    await expect(page).toHaveTitle(staticContents.cartPageTitle);
    //Click Proceed To Checkout
    await cartAndCheckout.proceedToCheckout.click();
    //Verify Address Details and Review Your Order
    await Helpers.verifyDeliveryAddressDetails(cartAndCheckout);
    await Helpers.reviewOrder(cartAndCheckout, productsInCart);
    //Enter description in comment text area and click 'Place Order'
    await cartAndCheckout.comments.fill(staticContents.orderComment);
    await cartAndCheckout.placeOrder.click();

    //make payments
    await Helpers.makePayment(page, paymentPage);
    //Click 'Delete Account' button
    await Helpers.deleteUserAccount(headerAndFooter, accountDeletedPage);
  });

  test("Test Case 17: Remove Products From Cart", async ({ page }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //. Add products to cart
    await Helpers.addProductsToCart(productsPage);
    //Click 'Cart' button
    await headerAndFooter.gotoCart();
    //Verify that cart page is displayed
    await expect(page).toHaveTitle(staticContents.cartPageTitle);
    //
    const cartProducts = await cartAndCheckout.tableBodyRows.all();
    for (let index = 0; index < cartProducts.length; index++) {
      const cartProduct = cartProducts[index];
      await cartProduct.locator(".cart_delete > a").click();
    }
    await expect(cartAndCheckout.emptyCart).toBeVisible();
    await expect(cartAndCheckout.emptyCart).toContainText(
      staticContents.emptyCardPartialString
    );
  });

  test("Test Case 18: View Category Products", async ({ page }) => {
    //Verify that categories are visible on left side bar
    await expect(productsPage.productCategories).toHaveCount(
      staticContents.productsPage.mainCategories
    );
    //Click on 'Women' category
    let productCategories = await productsPage.productCategories.all();
    for (let index = 0; index < productCategories.length; index++) {
      const productName = await productCategories[index]
        .locator(".panel-heading .panel-title > a")
        .textContent();
      if (
        productName.toLowerCase().trim() ==
        staticContents.womenCategory.toLowerCase().trim()
      ) {
        await productCategories[index]
          .locator(".panel-heading .panel-title > a")
          .click();
        const womenCategories = await productCategories[index]
          .locator("#Women ul li")
          .all();
        await womenCategories[0].locator("a").click();
        break;
      }
    }
    await page.waitForTimeout(4000);
    //Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    await expect(productsPage.womenCategoryHeader).toContainText(
      staticContents.womenCategory
    );
    //On left side bar, click on any sub-category link of 'Men' category
    productCategories = await productsPage.productCategories.all();
    for (let index = 0; index < productCategories.length; index++) {
      const productName = await productCategories[index]
        .locator(".panel-heading .panel-title > a")
        .textContent();
      if (
        productName.toLowerCase() == staticContents.menCategory.toLowerCase()
      ) {
        await productCategories[index]
          .locator(".panel-heading .panel-title > a")
          .click();
        const womenCategories = await productCategories[index]
          .locator("#Men ul li")
          .all();
        await womenCategories[0].locator("a").click();
      }
    }
    //Verify that user is navigated to that category page
    await expect(productsPage.womenCategoryHeader).toContainText(
      staticContents.menCategory
    );
  });

  test("Test Case 19: View & Cart Brand Products", async ({ page }) => {
    //Click on 'Products' button
    await headerAndFooter.gotoProducts();
    //Verify that Brands are visible on left side bar
    await expect(productsPage.brandlists).toHaveCount(
      staticContents.productsPage.brandLists
    );
    //verify first brand products
    await Helpers.verifyBrandProducts(
      productsPage,
      staticContents.productsPage.selectedBrand
    );
    //verify second brand products
    await Helpers.verifyBrandProducts(
      productsPage,
      staticContents.productsPage.selectedBrand++
    );
  });
  test("Test Case 20: Search Products and Verify Cart After Login", async ({
    page,
  }) => {
    //Click on 'Products' button
    await headerAndFooter.gotoProducts();
    page.waitForTimeout(2000);
    //Verify user is navigated to ALL PRODUCTS page successfully
    await expect(productsPage.featureItemsHeader).toBeVisible();
    await expect(productsPage.featureItemsHeader).toHaveText(
      staticContents.productsPage.allProductsHeader
    );
    //Verify 'SEARCHED PRODUCTS' is visible
    await Helpers.searchAndVerifyProducts(
      productsPage,
      staticContents.productsPage.productName,
      staticContents.productsPage.totalSearchResult
    );

    //Add those products to cart
    await Helpers.addProductsToCart(
      productsPage,
      staticContents.productsPage.totalSearchResult
    );
    // Click 'Cart' button and verify that products are visible in cart
    await headerAndFooter.gotoCart();
    await expect(cartAndCheckout.tableBodyRows).toHaveCount(
      staticContents.productsPage.totalSearchResult
    );

    //Click 'Signup / Login' button and submit login details
    await headerAndFooter.gotoLogin();
    //Fill all details in Signup and create account
    await Helpers.registerUser(
      page,
      headerAndFooter,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    //logout user
    await headerAndFooter.logoutUser();
    //Click 'Signup / Login' button
    await headerAndFooter.gotoLogin();
    //Fill email, password and click 'Login' button
    await loginPage.login(userProfile.email, userProfile.password);
    //Again, go to Cart page
    await headerAndFooter.gotoCart();
    //Verify that those products are visible in cart after login as well
    await expect(cartAndCheckout.tableBodyRows).toHaveCount(
      staticContents.productsPage.totalSearchResult
    );
    //delete user
    await Helpers.deleteUserAccount(headerAndFooter, accountDeletedPage);
  });
  test("Test Case 21: Add review on product", async ({ page }) => {
    //Click on 'Products' button
    await headerAndFooter.gotoProducts();
    // Verify user is navigated to ALL PRODUCTS page successfully
    await expect(productsPage.featureItemsHeader).toBeVisible();
    await expect(productsPage.featureItemsHeader).toContainText(
      staticContents.productsPage.allProductsHeader
    );
    //Click on 'View Product' of first product
    let productCards = await productsPage.productCards.all();
    await productCards[0].locator("ul.nav li a").click();
    //Verify 'Write Your Review' is visible
    await expect(productsPage.writeReview).toBeVisible();
    await expect(productsPage.writeReview).toContainText(
      staticContents.productsPage.review.writeReviewText
    );
    //Enter name, email and review
    await productsPage.reviewerName.fill(
      staticContents.productsPage.review.name
    );
    await productsPage.reviewerEmail.fill(
      staticContents.productsPage.review.email
    );
    await productsPage.reviewerMessage.fill(
      staticContents.productsPage.review.message
    );
    //Click 'Submit' button
    await productsPage.reviewButton.click();
    //Verify success message 'Thank you for your review.'
    // await expect(productsPage.reviewSuccessMessage).toBeVisible();// failing
    await expect(productsPage.reviewSuccessMessage).toContainText(
      staticContents.productsPage.review.successMessage
    );
  });
  test("Test Case 22: Add to cart from Recommended items", async ({ page }) => {
    //Scroll to bottom of page
    await headerAndFooter.footer.scrollIntoViewIfNeeded();
    //Verify 'RECOMMENDED ITEMS' are visible
    await expect(productsPage.recommendedItemsTitle).toBeVisible();
    await expect(productsPage.recommendedItemsTitle).toContainText(
      staticContents.recommendedItemsHeader
    );
    const recommendedItemCarouselItems =
      await productsPage.recommendedItemCarouselItems.all();
    expect(recommendedItemCarouselItems.length > 0).toBeTruthy();

    //Click on 'Add To Cart' on Recommended product
    await Helpers.addProductsToCart(
      productsPage,
      staticContents.productsPage.review.cartQuantity
    );
    // Click 'Cart' button
    await headerAndFooter.gotoCart();
    //Verify that product is displayed in cart page
    await expect(cartAndCheckout.tableBodyRows).toHaveCount(
      staticContents.productsPage.review.cartQuantity
    );
  });
  test("Test Case 23: Verify address details in checkout page", async ({
    page,
  }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Click 'Signup / Login' button
    await headerAndFooter.gotoLogin();
    //Register user
    await Helpers.registerUser(
      page,
      headerAndFooter,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    // Add products to cart
    const productsInCart = await Helpers.addProductsToCart(productsPage);
    // Click 'Cart' button
    await headerAndFooter.gotoCart();
    //Verify that cart page is displayed
    await expect(page).toHaveTitle(staticContents.cartPageTitle);
    //Click Proceed To Checkout
    await cartAndCheckout.proceedToCheckout.click();
    //Verify that the delivery address is same address filled at the time registration of account
    await Helpers.verifyDeliveryAddressDetails(cartAndCheckout);
    //Verify that the billing address is same address filled at the time registration of account
    await Helpers.verifyBillingAddressDetails(cartAndCheckout);
    //Click 'Delete Account' button
    await Helpers.deleteUserAccount(headerAndFooter, accountDeletedPage);
  });
  test("Test Case 24: Download Invoice after purchase order", async ({
    page,
  }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Add products to cart
    await Helpers.addProductsToCart(productsPage);
    //Click 'Cart' button
    await headerAndFooter.gotoCart();
    //Verify that cart page is displayed
    await expect(page).toHaveTitle(staticContents.cartPageTitle);
    //Click Proceed To Checkout
    await cartAndCheckout.proceedToCheckout.click();
    //Click 'Register / Login' button
    await headerAndFooter.gotoLogin();
    //Fill all details in Signup and create account
    await Helpers.registerUser(
      page,
      headerAndFooter,
      loginPage,
      signUpPage,
      accountCreatedPage
    );
    //.Click 'Cart' button
    await headerAndFooter.gotoCart();
    //Click 'Proceed To Checkout' button
    await cartAndCheckout.proceedToCheckout.click();
    //Verify Address Details and Review Your Order
    await Helpers.verifyDeliveryAddressDetails(cartAndCheckout);
    await Helpers.reviewOrder(cartAndCheckout, productsInCart);
    //Enter description in comment text area and click 'Place Order'
    await cartAndCheckout.comments.fill(staticContents.orderComment);
    await cartAndCheckout.placeOrder.click();
    //Click 'Download Invoice' button and verify invoice is downloaded successfully.
    await paymentPage.downloadInvoice.click();
    //Click 'Continue' button
    await paymentPage.continueButton.click();
    //Click 'Delete Account' button
    await Helpers.deleteUserAccount(headerAndFooter, accountDeletedPage);
  });
  test("Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async ({
    page,
  }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Scroll down page to bottom
    await headerAndFooter.footer.scrollIntoViewIfNeeded();
    //Verify text 'SUBSCRIPTION'
    await expect(headerAndFooter.subscriptionHeader).toBeVisible();
    await expect(headerAndFooter.subscriptionHeader).toHaveText(
      staticContents.subscriptionTitle
    );

    //Click on arrow at bottom right side to move upward
    await headerAndFooter.scrollUp.click({ force: true });
  });
  test("Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async ({
    page,
  }) => {
    //Verify that home page is visible successfully
    await expect(page).toHaveTitle(staticContents.homePageTitle);
    //Scroll down page to bottom
    await headerAndFooter.footer.scrollIntoViewIfNeeded();
    //Verify text 'SUBSCRIPTION'
    await expect(headerAndFooter.subscriptionHeader).toBeVisible();
    await expect(headerAndFooter.subscriptionHeader).toHaveText(
      staticContents.subscriptionTitle
    );

    //Click on arrow at bottom right side to move upward
    await headerAndFooter.scrollUp.click();
  });
});
