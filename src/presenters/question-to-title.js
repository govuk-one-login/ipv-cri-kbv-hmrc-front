module.exports = function (question, translate) {
  const key = `fields.${question.questionKey}.title`;
  const title = translate(key);

  if (title && !title.includes(question.questionKey)) {
    return title;
  }

  return " ";
};
