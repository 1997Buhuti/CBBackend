'use strict';
const dialogflow = require('@google-cloud/dialogflow');
const config = require('../Config/keys');
const SessionClient = new dialogflow.SessionsClient({ keyFilename: "C:\\Users\\dpman\\Downloads\\q-a-phem-973539eb86f5.json" });

module.exports ={
    textQuery: async function(text, parameters){
        let self = module.exports;
        let sessionPath=SessionClient.projectAgentSessionPath(config.googleProjectId, config.dialogflowSessionId)
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogflowSessionLanguageCode,
                },
            },
            queryParams: {
                payload:{
                    data:parameters
                }
            },
        };

        let responses = await SessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses
    },
    handleAction: function(responses){
        return responses;
    }
}
