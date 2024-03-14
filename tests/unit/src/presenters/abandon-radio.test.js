const abandonRadioPresenter = require("../../../../src/presenters/abandon-radio");

describe("abandonRadio presenter", () => {
  it("should return the correct object", () => {
    const translate = jest.fn();
    const result = abandonRadioPresenter(translate);

    expect(result.items).toHaveLength(2);
    expect(translate).toHaveBeenCalledTimes(4);
  });
});
