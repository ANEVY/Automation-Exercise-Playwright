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

    const loginPageTitle = await page.title();
    expect([
      staticContents.loginPageTitle,
      staticContents.signUpPageTitle,
    ]).toContain(loginPageTitle);

    // await expect(page).toHaveTitle(
    //   staticContents.loginPageTitle || staticContents.signUpPageTitle
    // );

    //Verify 'Enter Account Information' is visible
    // let signUpAccountHeader = await signUpPage.getAccountHeader();
    await expect(signUpPage.accountHeader).toBeVisible();
    await expect(signUpPage.accountHeader).toHaveText(
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

  static async verifyLoggedInUser(headerNavigations) {
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
  static async addToCart(product, productsPage) {
    //Hover over product and click 'Add to cart'
    await product.hover();
    await product.locator(".overlay-content a.add-to-cart").click();
    //Click 'Continue Shopping' button
    await expect(productsPage.cartModal).toBeVisible();
    await productsPage.continueShopping.click();
  }

  static async addProductsToCart(productsPage, productQuantity = 0) {
    //Add products to cart
    const productCards = await productsPage.productCards.all();
    let firstProduct = {};
    let secondProduct = {};
    let thirdProduct = {};
    let fourthProduct = {};

    let loopCount =
      productQuantity > 0
        ? productQuantity
        : staticContents.productsPage.productQuantity;

    for (let index = 0; index < loopCount; index++) {
      let product = productCards[index];
      if (index == 0) {
        firstProduct["name"] = await product
          .locator(".productinfo >p")
          .textContent();
        firstProduct["price"] = await product
          .locator(".productinfo >h2")
          .textContent();
      }
      if (index == 1) {
        secondProduct["name"] = await product
          .locator(".productinfo >p")
          .textContent();
        secondProduct["price"] = await product
          .locator(".productinfo >h2")
          .textContent();
      }
      if (index == 2) {
        thirdProduct["name"] = await product
          .locator(".productinfo >p")
          .textContent();
        thirdProduct["price"] = await product
          .locator(".productinfo >h2")
          .textContent();
      }
      if (index == 3) {
        fourthProduct["name"] = await product
          .locator(".productinfo >p")
          .textContent();
        fourthProduct["price"] = await product
          .locator(".productinfo >h2")
          .textContent();
      }
      //Hover over product and click 'Add to cart'
      await Helpers.addToCart(product, productsPage);
      // await product.hover();
      // await product.locator(".overlay-content a.add-to-cart").click();
      // //Click 'Continue Shopping' button
      // await expect(productsPage.cartModal).toBeVisible();
      // await productsPage.continueShopping.click();
    }

    return {
      firstProduct,
      secondProduct,
      thirdProduct,
      fourthProduct,
    };
  }

  static async verifyDeliveryAddressDetails(cartAndCheckout) {
    let firstNameLastName = (
      await cartAndCheckout.addressFirstnameLastName.textContent()
    ).split(" ");
    let addressCountryName =
      await cartAndCheckout.addressCountryName.textContent();

    let addressCityStatePostcode =
      await cartAndCheckout.addressCityStatePostcode.textContent();

    let firstName = firstNameLastName[1];
    let lastName = firstNameLastName[2];
    expect(firstName).toBe(userProfile.firstName);
    expect(lastName).toBe(userProfile.lastName);
    expect(addressCountryName).toBe(userProfile.country);
    const cityStatePostcode = [
      userProfile.city,
      userProfile.state,
      userProfile.zipCode,
    ];
    const matchFound = cityStatePostcode.some((option) =>
      addressCityStatePostcode.includes(option)
    );
    expect(matchFound).toBeTruthy();
  }
  static async verifyBillingAddressDetails(cartAndCheckout) {
    let firstNameLastName = (
      await cartAndCheckout.billingFirstnameLastName.textContent()
    ).split(" ");
    let addressCountryName =
      await cartAndCheckout.billingCountryName.textContent();

    let addressCityStatePostcode =
      await cartAndCheckout.billingCityStatePostcode.textContent();

    let firstName = firstNameLastName[1];
    let lastName = firstNameLastName[2];
    expect(firstName).toBe(userProfile.firstName);
    expect(lastName).toBe(userProfile.lastName);
    expect(addressCountryName).toBe(userProfile.country);
    const cityStatePostcode = [
      userProfile.city,
      userProfile.state,
      userProfile.zipCode,
    ];
    const matchFound = cityStatePostcode.some((option) =>
      addressCityStatePostcode.includes(option)
    );
    expect(matchFound).toBeTruthy();
  }

  static async reviewOrder(cartAndCheckout, productsInCart) {
    const cartProducts = await cartAndCheckout.tableBodyRows.all();
    for (let index = 0; index < cartProducts.length; index++) {
      const cartProduct = cartProducts[index];
      let cartProductName = await cartProduct
        .locator(".cart_description > h4")
        .textContent();
      let cartProductQuantity = await product
        .locator(".cart_quantity button")
        .textContent();
      let cartProductPrice = await product
        .locator(".cart_price > p")
        .textContent();
      if (index == 0) {
        expect(cartProductName).toBe(productsInCart.firstProduct.name);
        expect(cartProductQuantity).toBe("1");
        expect(cartProductPrice).toBe(productsInCart.firstProduct.price);
      }
      if (index == 1) {
        expect(cartProductName).toBe(productsInCart.secondProduct.name);
        expect(cartProductQuantity).toBe("1");
        expect(cartProductPrice).toBe(productsInCart.secondProduct.price);
      }
      if (index == 2) {
        expect(cartProductName).toBe(productsInCart.thirdProduct.name);
        expect(cartProductQuantity).toBe("1");
        expect(cartProductPrice).toBe(thirdProduct.price);
      }
      if (index == 3) {
        expect(cartProductName).toBe(productsInCart.fourthProduct.name);
        expect(cartProductQuantity).toBe("1");
        expect(cartProductPrice).toBe(productsInCart.fourthProduct.price);
      }
    }
  }

  static async makePayment(page, paymentPage) {
    page.on("dialog", async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.dismiss();
    });
    //Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await paymentPage.cardName.fill(staticContents.paymentPage.cardName);
    await paymentPage.cardNumber.fill(staticContents.paymentPage.cardNum);
    await paymentPage.cardCVC.fill(staticContents.paymentPage.cvc);
    await paymentPage.cardExpiryMonth.fill(
      staticContents.paymentPage.expiryMonth
    );
    await paymentPage.cardExpiryYear.fill(
      staticContents.paymentPage.expiryYear
    );

    //Click 'Pay and Confirm Order' button
    await paymentPage.payButton.click();
    // Verify success message 'Your order has been placed successfully!'
    // await expect(paymentPage.successMessage).toBeVisible();
    // await expect(paymentPage.successMessage).toHaveText();
    // await paymentPage.successMessage.textContent(
    //   staticContents.paymentPage.successMessage
    // );
    await expect(paymentPage.orderPlacedMessage).toBeVisible();
    await expect(paymentPage.orderPlacedMessage).toHaveText(
      staticContents.paymentPage.orderPlacedMessage
    );
  }
  static async verifyBrandProducts(productsPage, index) {
    //Click on any brand name
    let brands = await productsPage.brandlists.all();
    let selectedBrand = brands[index];
    let brandText = await selectedBrand
      .locator("a span.pull-right")
      .textContent();
    let totalBrandProducts = parseInt(
      brandText.replace("(", "").replace(")", "").trim()
    );
    let brandName = brandText.split(")")[1];

    await selectedBrand.locator("a").click();
    //Verify that user is navigated to brand page and brand products are displayed
    //await expect(page).toHaveURL(/.*brand_products.*/);
    await expect(productsPage.featureItemsHeader).toContainText(brandName);
    await expect(productsPage.productCards).toHaveCount(totalBrandProducts);
  }
  static async searchAndVerifyProducts(
    productsPage,
    searchText,
    totalSearchResult
  ) {
    await productsPage.searchProducts.fill(searchText);
    await productsPage.submitSearch.click();

    await expect(productsPage.searchedProducts).toBeVisible();

    await expect(productsPage.productCards).toHaveCount(totalSearchResult);
  }
}
