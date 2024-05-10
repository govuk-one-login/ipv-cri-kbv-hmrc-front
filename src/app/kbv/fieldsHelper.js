function stripSpaces(value) {
  return value.replace(/\s/g, "");
}

function stripDecimal(value) {
  return value.replace(/\.\d*/, "");
}

const numericWithOptionalDecimalZeros = /^\s*\d+(\s*\.\s*0+)?\s*$/; // Matches numbers with optional decimal zeros, allowing whitespace. Example: " 123 ", "123.00", "123.0", "123 . 00", etc.

const numericWithOptionalDecimal = /^\d+(\.\d{2})?$/; // Matches numbers with optional decimal places. Example: "123", "123.45"

const numericWithRequiredDecimals = /^\d+\.\d{2}$/; // Matches numbers with exactly two decimal places. Example: "123.45"

module.exports = {
  stripSpaces,
  stripDecimal,
  numericWithOptionalDecimalZeros,
  numericWithOptionalDecimal,
  numericWithRequiredDecimals,
};
