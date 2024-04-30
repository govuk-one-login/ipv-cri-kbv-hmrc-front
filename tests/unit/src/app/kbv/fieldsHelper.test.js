const fields = require("../../../../../src/app/kbv/fieldsHelper");

describe("stripSpaces function test", () => {
  it("should remove all spaces from the input string", () => {
    const input = "   123   456   ";
    const expectedOutput = "123456";

    const result = fields.stripSpaces(input);

    expect(result).toEqual(expectedOutput);
  });

  it("should return an empty string if the input is only spaces", () => {
    const input = "      ";
    const expectedOutput = "";

    const result = fields.stripSpaces(input);

    expect(result).toEqual(expectedOutput);
  });

  it("should return the input string if it contains no spaces", () => {
    const input = "123456";
    const expectedOutput = "123456";

    const result = fields.stripSpaces(input);

    expect(result).toEqual(expectedOutput);
  });
});

describe("stripDecimal function test", () => {
  it("should remove decimal parts from the input string", () => {
    const input = "123.00";
    const expectedOutput = "123";

    const result = fields.stripDecimal(input);

    expect(result).toEqual(expectedOutput);
  });

  it("should remove .0 from the input string", () => {
    const input = "123.0";
    const expectedOutput = "123";

    const result = fields.stripDecimal(input);

    expect(result).toEqual(expectedOutput);
  });

  it("should return the input string if it contains no decimal parts", () => {
    const input = "123";
    const expectedOutput = "123";

    const result = fields.stripDecimal(input);

    expect(result).toEqual(expectedOutput);
  });
});
