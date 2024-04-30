// The session-id should be in the form "questions-<journeyType>-SEPARATOR-<random-guid>"
def sessionId = context.request.headers['session-id']
def prefix = "questions-";
def separatorIndex = sessionId.indexOf("-SEPARATOR-");
def journeyType = sessionId.substring(prefix.length(), separatorIndex)

def serializer = new groovy.json.JsonOutput();

def questionStore = stores.open("questions");
def questions = questionStore.load("questions")[journeyType];

def currentQuestionStore = stores.open("currentQuestion" + sessionId)

def answers = stores.open("answers" + sessionId).loadAll();

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
