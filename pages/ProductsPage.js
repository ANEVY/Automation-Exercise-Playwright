export default class ProductsPage {
  constructor(page) {
    this.page = page;
    this.advertismentImage = page.locator("#advertisement img");
    this.searchProducts = page.locator("#search_product");
    this.submitSearch = page.locator("#submit_search");
    this.allProducts = page.locator(
      "/html/body/section[2]/div/div/div[2]/div/h2"
    );
    this.categoryHeader = page.locator(
      "/html/body/section[2]/div/div/div[1]/div/h2"
    );
    this.productCards = page.locator(
      ".features_items div.product-image-wrapper"
    );
    this.productName = page.locator(
      "//section/div/div/div[2]/div[2]/div[2]/div/h2"
    );
    this.productCategory = page.locator(
      "//section/div/div/div[2]/div[2]/div[2]/div/p[1]"
    );
    this.productPrice = page.locator(
      "//section/div/div/div[2]/div[2]/div[2]/div/span/span"
    );
    this.productAvailability = page.locator(
      "//section/div/div/div[2]/div[2]/div[2]/div/p[2]"
    );
    this.productCondition = page.locator(
      "//section/div/div/div[2]/div[2]/div[2]/div/p[3]"
    );
    this.productBrand = page.locator(
      "//section/div/div/div[2]/div[2]/div[2]/div/p[4]"
    );
  }
}
