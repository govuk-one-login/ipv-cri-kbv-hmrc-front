// The session-id should be in the form "questions-<journeyType>-SEPARATOR-<random-guid>"
def sessionId = context.request.headers['session-id']
def prefix = "questions-";
def separatorIndex = sessionId.indexOf("-SEPARATOR-");
def journeyType = sessionId.substring(prefix.length(), separatorIndex)

def parser = new groovy.json.JsonSlurper();
def body = parser.parseText(context.request.body);
def questionKey = body.questionKey;
def answer = body.value;

def questionStore = stores.open("questions");
def questions = questionStore.load("questions")[journeyType];
def currentQuestionKey = stores.open("currentQuestion" + sessionId).load("currentQuestionKey");

def answerStore = stores.open("answers" + sessionId);
def answers = answerStore.loadAll();

def result = questions.find {question -> question.questionKey == questionKey};

if (!result) {
    respond {
        withStatusCode(404)
        withContent("No questions exist with key: ${questionKey}.")
    }
    return
}

if (answers.containsKey(questionKey)) {
    respond {
        withStatusCode(422)
        withContent("Question already answered.")
    }
    return
}

if (currentQuestionKey != questionKey) {
    respond {
        withStatusCode(400)
        withContent("Incorrect question answered.")
    }
    return
}

respond {
    withStatusCode(202)
}

answerStore.save(questionKey, answer);
