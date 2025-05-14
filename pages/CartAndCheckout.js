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
    this.checkoutModal = page.locator("#checkoutModal");
    this.modalHeader = page.locator(
      '//*[@id="checkoutModal"]/div/div/div[1]/h4'
    );
    this.modalBodyText = page.locator(
      '//*[@id="checkoutModal"]/div/div/div[2]/p[1]'
    );
    this.modalLoginButton = page.locator(
      '//*[@id="checkoutModal"]/div/div/div[2]/p[2]/a'
    );
    this.addressTitle = page.locator("#address_delivery .address_title");
    this.addressFirstnameLastName = page.locator(
      "#address_delivery .address_firstname"
    );
    this.addressCountryName = page.locator(
      "#address_delivery .address_country_name "
    );
    this.addressCityStatePostcode = page.locator(
      "#address_delivery .address_city"
    );

    this.billingFirstnameLastName = page.locator(
      "#address_invoice .address_firstname"
    );
    this.billingCountryName = page.locator(
      "#address_invoice .address_country_name "
    );
    this.billingCityStatePostcode = page.locator(
      "#address_invoice .address_city"
    );
    this.comments = page.locator('textarea[name="message"]');
    this.placeOrder = page.locator('//*[@id="cart_items"]/div/div[7]/a');
    this.emptyCart = page.locator('//*[@id="empty_cart"]/p');
  }
}
