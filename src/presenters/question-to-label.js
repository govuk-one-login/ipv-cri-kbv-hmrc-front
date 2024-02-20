module.exports = function (question, translate) {
  const key = `fields.${question.questionKey}.label`;
  const label = translate(key);

  if (label && !label.includes(question.questionKey)) {
    return label;
  }

  return " ";
};
