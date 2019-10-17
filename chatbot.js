const dialogflow = require("dialogflow");
const path = require("path");
const homedir = require("os").homedir();
const serviceAccount = path.join(
  homedir,
  ".keys",
  "antojitos-b621a-2e647887bf83.json"
);

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: serviceAccount
});
const sessionPath = sessionClient.sessionPath(
  process.env.GOOGLE_PROJECT_ID,
  process.env.GOOGLE_SESSION_ID
);

module.exports = {
  textQuery: async function(text) {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: "es-ES"
        }
      }
    };
    const responses = await sessionClient.detectIntent(request);
    const {
      fulfillmentMessages,
      intent,
      parameter,
      parameters
    } = responses[0].queryResult;
    const { displayName } = intent;
    return { fulfillmentMessages, displayName, parameters };
  },
  eventQuery: async function(e) {
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: e,
          languageCode: "es-ES"
        }
      }
    };
    const responses = await sessionClient.detectIntent(request);
    const {
      fulfillmentMessages,
      intent,
      parameters
    } = responses[0].queryResult;
    const { displayName } = intent;
    return { fulfillmentMessages, displayName, parameters };
  }
};
