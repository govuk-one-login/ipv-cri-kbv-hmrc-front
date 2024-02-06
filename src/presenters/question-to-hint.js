module.exports = function (question, translate) {
  const key = `fields.${question.questionKey}.hint`;
  const hint = translate(key);

  if (hint && !hint.includes(question.questionKey)) {
    return hint;
  }

  return " ";
};
