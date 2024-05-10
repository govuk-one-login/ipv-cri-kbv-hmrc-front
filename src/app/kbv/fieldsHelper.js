function stripSpaces(value) {
  return value.replace(/\s/g, "");
}

function stripDecimal(value) {
  return value.replace(/\.\d*/, "");
}

const numericWithOptionalDecimalZeros = /^\s*\d+(\s*\.\s*0+)?\s*$/; // Matches numbers with optional decimal zeros, allowing whitespace. Example: " 123 ", "123.00", "123.0", "123 . 00", etc.

module.exports = {
  stripSpaces,
  stripDecimal,
  numericWithOptionalDecimalZeros,
};
