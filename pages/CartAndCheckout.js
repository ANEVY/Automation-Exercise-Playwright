export default class CartAndCheckout {
  constructor(page) {
    this.page = page;
    this.proceedToCheckout = page.locator(
      '//*[@id="do_action"]/div[1]/div/div/a'
    );
    this.tableBody = page.locator('//*[@id="cart_info_table"]/tbody');
    this.tableBodyRows = page.locator('//*[@id="cart_info_table"]/tbody/tr');
    this.tableHead = page.locator('//*[@id="cart_info_table"]/thead');
    this.breadCrumb = page.locator('//*[@id="cart_items"]/div/div[1]/ol');
  }
}
