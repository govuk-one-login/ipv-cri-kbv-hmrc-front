def serializer = new groovy.json.JsonOutput();

def questionStore = stores.open("questions");
def questions = questionStore.load("questions");

def answers = stores.open("answers").loadAll();

if (answers.size() >= 1) {
    respond {
        withStatusCode(204)
    }
    return
}

def currentQuestion = questions[0];

respond {
    withStatusCode(200)
    withContent(serializer.toJson(currentQuestion))
}

questionStore.save("currentQuestionKey", currentQuestion.questionKey);
