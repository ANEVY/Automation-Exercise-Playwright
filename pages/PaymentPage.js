export default class PaymentPage {
  constructor(page) {
    this.page = page;
    this.header = page.locator('//*[@id="cart_items"]/div/div[2]/h2');
    this.breadCrumb = page.locator('//*[@id="cart_items"]/div/div[1]/ol');
    this.cardName = page.locator('input[data-qa="name-on-card"]');
    this.cardNumber = page.locator('input[data-qa="card-number"]');
    this.cardCVC = page.locator('input[data-qa="cvc"]');
    this.cardExpiryMonth = page.locator('input[data-qa="expiry-month"]');
    this.cardExpiryYear = page.locator('input[data-qa="expiry-year"]');
    this.payButton = page.locator('button[data-qa="pay-button"]');
    this.successMessage = page.locator("#success_message > div");
    this.downloadInvoice = page.locator('//*[@id="form"]/div/div/div/a');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
    this.orderPlacedMessage = page.locator('//*[@id="form"]/div/div/div/p');
  }
}
