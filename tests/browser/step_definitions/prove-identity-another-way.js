const { Then, When, Given } = require("@cucumber/cucumber");
const { ProveIdentityAnotherWayPage, RelyingPartyPage } = require("../pages");
const { expect, assert } = require("chai");

Given("they choose to abandon", async function () {
  const proveIdentityAnotherWayPage = new ProveIdentityAnotherWayPage(
    this.page
  );
  await proveIdentityAnotherWayPage.selectAbandon();
});

Given("they choose to return to answering question option", async function () {
  const proveIdentityAnotherWayPage = new ProveIdentityAnotherWayPage(
    this.page
  );
  await proveIdentityAnotherWayPage.selectReturn();
});

When("they click continue from prove identity another way", async function () {
  const proveIdentityAnotherWayPage = new ProveIdentityAnotherWayPage(
    this.page
  );
  await proveIdentityAnotherWayPage.continue();
});

Then("they should see the abandon page", function () {
  const proveIdentityAnotherWayPage = new ProveIdentityAnotherWayPage(
    this.page
  );
  expect(proveIdentityAnotherWayPage.isCurrentPage()).to.be.true;
});

Then(
  "they should see prove identity another way validation messages",
  function () {
    const proveIdentityAnotherWayPage = new ProveIdentityAnotherWayPage(
      this.page
    );
    expect(proveIdentityAnotherWayPage.isCurrentPage()).to.be.true;

    expect(proveIdentityAnotherWayPage.hasErrorSummary).to.not.be.false;
  }
);

Then("they should be redirected as access denied", function () {
  const rpPage = new RelyingPartyPage(this.page);

  expect(rpPage.isRelyingPartyServer()).to.be.true;
  const { searchParams } = new URL(rpPage.page.url());
  assert.equal(searchParams.get("error"), "access_denied");
});
