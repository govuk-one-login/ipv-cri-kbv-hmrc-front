module.exports = function (translate) {
  return {
    id: "prove-identity-another-way",
    name: "abandonRadio",
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
        id: "continue",
        value: "continue",
        text: translate("pages.prove-identity-another-way.continue"),
        hint: {
          html: " ",
        },
      },
      {
        id: "stop",
        value: "stop",
        text: translate("pages.prove-identity-another-way.stop"),
        hint: {
          html: " ",
        },
      },
    ],
  };
};
