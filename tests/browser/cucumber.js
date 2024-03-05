require("dotenv").config();

module.exports = {
  default: {
    paths: ["./features/**/**.feature"],
    require: [
      "./support/**/*.js",
      "./step_definitions/**/*.js",
      "./pages/*.js",
    ],
    tags: "not @skip",
  },
};
