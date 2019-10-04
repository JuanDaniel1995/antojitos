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
    const { fulfillmentMessages } = responses[0].queryResult;
    return fulfillmentMessages;
  },
  eventQuery: async function(event) {
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          languageCode: "es-ES"
        }
      }
    };
    const responses = await sessionClient.detectIntent(request);
    const { fulfillmentMessages } = responses[0].queryResult;
    return fulfillmentMessages;
  }
};
