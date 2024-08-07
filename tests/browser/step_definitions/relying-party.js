const { Given, When, Then } = require("@cucumber/cucumber");

const { RelyingPartyPage } = require("../pages");
const { expect } = require("chai");

Given(/^([A-Za-z ]+) is using the system$/, async function (_name) {
  const rpPage = new RelyingPartyPage(this.page, this.TESTING_CLIENT_ID);

  await rpPage.goto();
});

Given("they have been redirected as a success", function () {
  const rpPage = new RelyingPartyPage(this.page, this.TESTING_CLIENT_ID);
  expect(rpPage.isRelyingPartyServer()).to.be.true;
  expect(rpPage.hasSuccessQueryParams()).to.be.true;
});

Then(
  "they should be redirected as an error with a description {string}",
  function (err) {
    const rpPage = new RelyingPartyPage(this.page, this.TESTING_CLIENT_ID);

    expect(rpPage.isRelyingPartyServer()).to.be.true;

    expect(rpPage.hasErrorQueryParams(err)).to.be.true;
  }
);

Then("they should be redirected as a success", function () {
  const rpPage = new RelyingPartyPage(this.page, this.TESTING_CLIENT_ID);

  expect(rpPage.isRelyingPartyServer()).to.be.true;

  expect(rpPage.hasSuccessQueryParams()).to.be.true;
});

Then(
  /^they should be redirected as an error with code (.*)$/,
  function (error_code) {
    const rpPage = new RelyingPartyPage(this.page, this.TESTING_CLIENT_ID);

    expect(rpPage.isRelyingPartyServer()).to.be.true;

    expect(rpPage.isErrorCode(error_code)).to.be.true;
  }
);

When("they return to a previous page", async function () {
  const rpPage = new RelyingPartyPage(this.page, this.TESTING_CLIENT_ID);

  await rpPage.page.goBack();
});
