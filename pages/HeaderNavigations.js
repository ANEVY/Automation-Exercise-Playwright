export default class HeaderNavigations {
  constructor(page) {
    this.page = page;
    this.homePage = page.locator('ul.nav a[href="/"]');
    // this.logoImage = page.locator('ul.nav a[href="/"]');
    this.loginPage = page.locator('.nav a[href="/login"]');
    this.signUpPage = page.locator('.nav a[href="/signup"]');
    this.accountPage = page.locator('.nav a[href="/account"]');
    this.cartPage = page.locator('.nav a[href="/view_cart"]');
    this.apiTestingPage = page.locator('.nav a[href="/api_list"]');
    this.videTutorialPage = page.locator(
      'a[href="https://www.youtube.com/c/AutomationExercise"]'
    );
    this.contactPage = page.locator('.nav a[href="/contact_us"]');
    this.testCasesPage = page.locator('.nav a[href="/test_cases"]');
    this.blogPage = page.locator('.nav a[href="/blog"]');
    this.productsPage = page.locator('.nav a[href="/products"]');
    this.logout = page.locator('.nav a[href="/logout"]');
    this.deleteAccount = page.locator('.nav a[href="/delete_account"]');
    this.loggedInUser = page.locator(
      "#header ul.nav.navbar-nav > li:nth-child(10) > a"
    );
  }

  async openHomePage() {
    await this.page.goto("/");
  }
  async gotoHome() {
    await this.homePage.click();
  }

  async gotoLogin() {
    await this.loginPage.click();
  }

  async gotoSignUp() {
    await this.signUpPage.click();
  }

  async getAccountContent() {
    await this.accountPage.textContent();
  }

  async gotoCart() {
    await this.cartPage.click();
  }

  async gotoApiTesting() {
    await this.apiTestingPage.click();
  }

  async gotoVideoTutorial() {
    await this.videTutorialPage.click();
  }

  async gotoContact() {
    await this.contactPage.click();
  }

  async gotoTestCases() {
    await this.testCasesPage.click();
  }

  async gotoBlog() {
    await this.blogPage.click();
  }

  async gotoProducts() {
    await this.productsPage.click();
  }

  async logout() {
    await this.logout.click();
  }

  async deleteUserAccount() {
    await this.deleteAccount.click();
  }
  async assertHomePageTitle(pageTitle) {
    await expect(this.page).toHaveTitle(pageTitle);
  }
  async getHomePageTitle() {
    console.log(await this.page.title());
    return await this.page.title();
  }

  async getLoggedInUserContent() {
    return await this.loggedInUser.textContent();
  }
  async getLoggedInUser() {
    return await this.loggedInUser;
  }
}
