import { assetsPaths } from "../data/test_data";

export default class ContactUsPage {
  constructor(page) {
    this.page = page;
    this.pageHeader = page.locator('//*[@id="contact-page"]/div[1]/div/div/h2');
    this.pageNoteElement = page.locator(
      '//*[@id="contact-page"]/div[2]/div[1]/div/div[1]'
    );
    this.getIntouch = page.locator(
      '//*[@id="contact-page"]/div[2]/div[1]/div/h2'
    );
    this.feedBack = page.locator(
      '//*[@id="contact-page"]/div[2]/div[2]/div/h2'
    );
    this.feedBackDesc = page.locator(
      '//*[@id="contact-page"]/div[2]/div[2]/div/address'
    );
    this.name = page.locator('input[data-qa="name"]');
    this.email = page.locator('input[data-qa="email"]');
    this.subject = page.locator('input[data-qa="subject"]');
    this.message = page.locator('textarea[data-qa="message"]');
    this.file = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.successAlert = page.locator(".contact-form div.alert-success");
  }

  async contactUs(name, email, subject, message) {
    //accept dialog listener

    this.page.on("dialog", async (dialog) => {
      console.log("Dialog says:", dialog.message());
      await dialog.accept(); // confirm
      // or await dialog.dismiss(); // cancel
    });
    await this.name.fill(name);
    await this.email.fill(email);
    await this.subject.fill(subject);
    await this.message.fill(message);
    await this.file.setInputFiles("./" + assetsPaths.images.farmerRidges); //upload a file
    await this.page.waitForTimeout(2000); // Sleep for 2 seconds
    await this.submitButton.click();
  }
}
