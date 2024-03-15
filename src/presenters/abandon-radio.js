module.exports = function (translate) {
  return {
    id: "prove-identity-another-way",
    name: "prove-identity-another-way",
    label: translate("pages.prove-identity-another-way.legend"),
    legend: translate("pages.prove-identity-another-way.legend"),
    fieldset: {
      legend: {
        isPageHeading: true,
        classes: "govuk-fieldset__legend--m",
      },
    },
    hint: {
      html: " ",
    },
    items: [
      {
        id: "stop",
        value: "stop",
        text: translate("pages.prove-identity-another-way.stop"),
        hint: {
          html: " ",
        },
        conditional: {
          html: "",
        },
      },
      {
        id: "continue",
        value: "continue",
        text: translate("pages.prove-identity-another-way.continue"),
        hint: {
          html: " ",
        },
        conditional: {
          html: "",
        },
      },
    ],
  };
};
