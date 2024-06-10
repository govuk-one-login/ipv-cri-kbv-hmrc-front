// Steps for any background tasks we need to do pre tests
const { Given, When, Then } = require("@cucumber/cucumber");
const { ErrorPage } = require("../pages");
const { expect } = require("chai");

Given("they start with {string}", async function (lang) {
  await setLanguageCookie(lang, this.page.url(), this.context);
  await this.page.reload();
});

When(/they set the language to "(.*)" using cookies$/, async function (lang) {
  await setLanguageCookie(lang, this.page.url(), this.context);
  await this.page.reload();
});

When(
  /they set the language to "(.*)" using the toggle$/,
  async function (lang) {
    await setLanguageWithToggle(lang, this.page);
    await this.page.reload();
  }
);

Then(/^the page's language property should be "(.*)"$/, async function (lang) {
  const code = lang.toLowerCase() === "welsh" ? "cy" : "en";
  const hasLanguageCorrectCode = await this.page
    .locator(`html[lang="${code}"]`)
    .count();
  expect(hasLanguageCorrectCode).to.equal(1);
});

Then(/^they (?:should )?see(?:ed)? the page in "(.*)"$/, async function (lang) {
  const errorPage = new ErrorPage(this.page);
  const errorTitle = await errorPage.getErrorTitle();

  expect(errorTitle).to.equal(
    errorPage.getLocalisedSomethingWentWrongMessage(lang)
  );
});

async function setLanguageCookie(lang, url, context) {
  const code = lang.toLowerCase() === "welsh" ? "cy" : "en";

  const cookie = {
    name: "lng",
    value: code,
    url,
  };

  await context.addCookies([cookie]);
}

async function setLanguageWithToggle(lang, page) {
  const errorPage = new ErrorPage(page);
  const code = lang.toLowerCase() === "welsh" ? "cy" : "en";

  await errorPage.toggleLanguage(code);
}
