function stripSpaces(value) {
  return value.replace(/\s/g, "");
}

function stripDecimal(value) {
  return value.replace(/\.\d*/, "");
}

module.exports = {
  stripSpaces,
  stripDecimal,
};
