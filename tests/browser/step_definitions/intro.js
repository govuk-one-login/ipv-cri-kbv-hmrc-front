const { Given, Then, When } = require("@cucumber/cucumber");
const { IntroPage } = require("../pages");
const { expect } = require("chai");

Then(/they should see the intro page$/, async function () {
  const introPage = new IntroPage(this.page);

  expect(introPage.isCurrentPage()).to.be.true;
});

Then("they continue from intro", async function () {
  const introPage = new IntroPage(this.page);
  await introPage.continue();
});
