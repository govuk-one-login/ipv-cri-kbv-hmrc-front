static void clearStore(io.gatehill.imposter.store.inmem.InMemoryStore store) {
    def allItems = store.loadAll();
    def allKeys = allItems.keySet();

    for (key in allKeys) {
        store.delete(key);
    }
}

def jsonSlurper = new groovy.json.JsonSlurper()
def parsedBody = jsonSlurper.parseText(context.request.body)
def journeyType = parsedBody.client_id

def currentQuestionStore = stores.open("currentQuestion" + journeyType);
def answerStore = stores.open("answers" + journeyType);

clearStore(currentQuestionStore);
clearStore(answerStore);
