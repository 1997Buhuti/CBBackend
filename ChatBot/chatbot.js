'use strict';
const dialogflow = require('@google-cloud/dialogflow');
const config = require('../Config/keys');
const structjson = require('structjson');

const projectID = config.googleProjectId;
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}
const SessionClient = new dialogflow.SessionsClient({projectID, credentials});

module.exports = {
    textQuery: async function (text, parameters = {}) {
        let self = module.exports;
        let sessionPath = SessionClient.projectAgentSessionPath(config.googleProjectId, config.dialogflowSessionId)
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogflowSessionLanguageCode
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            },
        };

        let responses = await SessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses
    },
    eventQuery: async function (event, parameters = {}) {
        let self = module.exports;
        let sessionPath = SessionClient.projectAgentSessionPath(config.googleProjectId, config.dialogflowSessionId)
        //let eventName='WELCOME';
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: config.dialogflowSessionLanguageCode
                },
            },
        };

        let responses = await SessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses
    },
    handleAction: function (responses) {
        return responses;
    }
}
