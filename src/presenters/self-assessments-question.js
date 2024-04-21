const taxYearToText = require("./tax-year-to-text");

module.exports = (translationKey, question, translate) => {
  const items = Object.values(translate(`fields.${translationKey}.items`));
  const content = translate(`fields.${translationKey}.content`);

  return {
    id: translationKey,
    name: translationKey,
    content: content,
    title: translate(`fields.${translationKey}.title`, taxYearToText(question)),
    items: items,
  };
};
