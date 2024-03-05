require("dotenv").config();

module.exports = {
  default: {
    paths: ["./tests/browser/features/**/**.feature"],
    require: [
      "./tests/browser/support/**/*.js",
      "./tests/browser/step_definitions/**/*.js",
      "./tests/browser/pages/*.js",
    ],
    tags: "not @skip",
  },
};
