def parser = new groovy.json.JsonSlurper();
def body = parser.parseText(context.request.body);

def questionKey = body.key;
def answer = body.value;

def questionData = stores.open("questions").loadAll();
def questions = questionData.questions;
def currentQuestionKey = questionData.currentQuestionKey;

def answerStore = stores.open("answers");
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
        withStatusCode(400)
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
    withStatusCode(201)
}

answerStore.save(questionKey, answer);
