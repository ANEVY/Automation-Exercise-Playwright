export default class SignUpPage {
  constructor(page) {
    this.page = page;
    this.mrTitle = page.locator("input#id_gender1");
    this.mrsTitle = page.locator("input#id_gender2");
    this.name = page.locator('input[data-qa="name"]');
    this.email = page.locator('input[data-qa="email"]');
    this.password = page.locator('input[data-qa="password"]');
    this.birthDay = page.locator('select[data-qa="days"]');
    this.birthMonth = page.locator('select[data-qa="months"]');
    this.birthYear = page.locator('select[data-qa="years"]');
    this.newsletter = page.locator("input#newsletter");
    this.offer = page.locator("input#optin");
    this.firstName = page.locator('input[data-qa="first_name"]');
    this.lastName = page.locator('input[data-qa="last_name"]');
    this.company = page.locator('input[data-qa="company"]');
    this.address = page.locator('input[data-qa="address"]');
    this.address2 = page.locator('input[data-qa="address2"]');
    this.city = page.locator('input[data-qa="city"]');
    this.state = page.locator('input[data-qa="state"]');
    this.zipCode = page.locator('input[data-qa="zipcode"]');
    this.mobileNumber = page.locator('input[data-qa="mobile_number"]');
    this.country = page.locator('select[data-qa="country"]');
    this.createButton = page.locator('button[data-qa="create-account"]');
    this.accountHeader = page.locator("#form > div > div > div > div > h2");
    this.addressHeader = page.locator(
      "#form > div > div > div > div > form > h2"
    );
  }
  async createAccount(
    title,
    firstName,
    lastName,
    password,
    day,
    month,
    year,
    company,
    address,
    address2,
    city,
    state,
    zipCode,
    mobileNumber,
    country,
    newsletter = false,
    offer = true
  ) {
    if (title.toLowerCase().replace(".", "") === "mrs") {
      await this.mrsTitle.check();
    } else {
      await this.mrTitle.check();
    }
    // await this.mrTitle.click();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    // await this.email.fill(email);
    await this.password.fill(password);
    await this.birthDay.selectOption(day);
    await this.birthMonth.selectOption(month);
    await this.birthYear.selectOption(year);
    await this.company.fill(company);
    await this.address.fill(address);
    await this.address2.fill(address2);
    await this.city.fill(city);
    await this.state.fill(state);
    await this.zipCode.fill(zipCode);
    await this.mobileNumber.fill(mobileNumber);
    await this.country.selectOption(country);
    if (newsletter) {
      await this.newsletter.check();
    } else {
      await this.newsletter.uncheck();
    }
    if (offer) {
      await this.offer.check();
    } else {
      await this.offer.uncheck();
    }
    await this.createButton.click();
  }

  async getAccountHeader() {
    return await this.accountHeader;
  }

  async getAddressHeader() {
    return await this.addressHeader;
  }
}
