def serializer = new groovy.json.JsonOutput();

def journeyType = context.request.headers['session-id']

def questionStore = stores.open("questions");
def questions = questionStore.load("questions")[journeyType];

def currentQuestionStore = stores.open("currentQuestion" + journeyType)

def answers = stores.open("answers" + journeyType).loadAll();

if (answers.size() >= questions.size()) {
    respond {
        withStatusCode(204)
    }
    return
}

def currentQuestion = questions[answers.size()];

respond {
    withStatusCode(200)
    withContent(serializer.toJson(currentQuestion))
}

currentQuestionStore.save("currentQuestionKey", currentQuestion.questionKey);
