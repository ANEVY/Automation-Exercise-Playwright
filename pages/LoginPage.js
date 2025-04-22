export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginEmailAddress = page.locator('input[data-qa="login-email"]');
    this.loginPassword = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.errorMessage = page.locator(
      '//*[@id="form"]/div/div/div[1]/div/form/p'
    );
    this.loginHeader = page.locator("div.login-form h2");
    this.signupHeader = page.locator("div.signup-form h2");
    this.signupEmailAddress = page.locator('input[data-qa="signup-email"]');
    this.signupName = page.locator('input[data-qa="signup-name"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.signupErrorMessage = page.locator(
      '//*[@id="form"]/div/div/div[3]/div/form/p'
    );
  }

  async login(email, password) {
    await this.loginEmailAddress.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async signup(name, email) {
    await this.signupName.fill(name);
    await this.signupEmailAddress.fill(email);
    await this.signupButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage;
  }

  async getLoginHeader() {
    return await this.loginHeader;
  }

  async getSignupHeader() {
    return await this.signupHeader;
  }

  async getSignupErrorMessage() {
    return await this.signupErrorMessage;
  }

  async getLoginEmailAddress() {
    return await this.loginEmailAddress;
  }

  async getLoginPassword() {
    return await this.loginPassword;
  }
  async goto() {
    await this.page.goto("/login");
  }
  async asserLoginTitleIsVisible() {
    await expect(this.loginHeader).toBeVisible();
  }

  async assertSignupTitleIsVisible(signUpTile) {
    await expect(this.signupHeader).toBeVisible();
    await expect(this.signupHeader).toHaveText(signUpTile);
  }
}
