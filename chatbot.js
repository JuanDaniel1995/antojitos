const dialogflow = require("dialogflow");

const sessionClient = new dialogflow.SessionsClient();
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
