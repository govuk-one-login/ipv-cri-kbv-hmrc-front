module.exports = function (question, translate) {
  const key = `pages.${question.questionKey}.title`;
  const title = translate(key);

  if (title && !title.includes(question.questionKey)) {
    return title;
  }

  return " ";
};
