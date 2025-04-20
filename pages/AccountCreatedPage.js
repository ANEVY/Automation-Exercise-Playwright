export default class AcccountCreatedPage {
  constructor(page) {
    this.page = page;
    this.accountHeader = page.locator("h2[data-qa='account-created']");
    this.firstPTag = page.locator("#form > div > div > div > p:nth-child(2)");
    this.secondPTag = page.locator("#form > div > div > div > p:nth-child(3)");
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }
  async getAccountHeader() {
    return await this.accountHeader;
  }

  async getFirstPTag() {
    return await this.firstPTag.textContent();
  }
  async getSecondPTag() {
    return await this.secondPTag.textContent();
  }
  async clickContinueButton() {
    await this.continueButton.click();
  }
}
