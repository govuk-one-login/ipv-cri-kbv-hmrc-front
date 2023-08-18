def serializer = new groovy.json.JsonOutput();

def questionStore = stores.open("questions");
def questions = questionStore.load("questions");

def answers = stores.open("answers").loadAll();
def unansweredQuestions = questions.findAll {question -> !answers.containsKey(question.questionKey)};

if (unansweredQuestions.size() === 0) {
    respond {
        withStatusCode(204)
    }
    return
}

def currentQuestion = unansweredQuestions[0];

respond {
    withStatusCode(200)
    withContent(serializer.toJson(currentQuestion))
}

questionStore.save("currentQuestionKey", currentQuestion.questionKey);
