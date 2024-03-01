module.exports = function (question, translate) {
  const key = `fields.${question.questionKey}.content`;
  const content = translate(key);

  if (content && !content.includes(question.questionKey)) {
    return content;
  }

  return " ";
};
