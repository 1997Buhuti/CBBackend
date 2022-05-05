'use strict';
const dialogflow = require('@google-cloud/dialogflow').v2beta1;
const config = require('../Config/keys');
const structjson = require('structjson');
const mongoose = require('mongoose');
const projectID = config.googleProjectId;
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}
const SessionClient = new dialogflow.SessionsClient({projectID, credentials});
const knowledgeBasePaths=["projects/q-a-phem/knowledgeBases/MzQyOTc0MDcwNTM4MjEzNzg1Ng"]
const Registration = require('../Models/UserRegister')
let invalidMessage="";
module.exports = {
    textQuery: async function (text, userId, parameters = {}) {
        let self = module.exports;
        let sessionPath = SessionClient.projectAgentSessionPath(config.googleProjectId, config.dialogflowSessionId +userId )
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
                },
                knowledgeBaseNames: knowledgeBasePaths,
            },
        };

        let responses = await SessionClient.detectIntent(request);
        console.log(responses);
        if(responses && responses.fullfillmentText==="Answer"){
            invalidMessage=responses.queryText.toString();
        }
        responses = await self.handleAction(responses);
        return responses
    },
    eventQuery: async function (event, userId, parameters = {}) {
        let self = module.exports;
        let sessionPath = SessionClient.projectAgentSessionPath(config.googleProjectId, config.dialogflowSessionId + userId)
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
        console.log("inside handleAction ");
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'sendMessageToTeacher':
                if (queryResult.allRequiredParamsPresent) {
                    console.log(queryResult.parameters.fields);
                    let client= self.saveUserQueries(queryResult.parameters.fields).then(()=>{
                        responses.push(client);
                        return responses;
                    })
                    //Object.assign(self.saveUserQueries(queryResult.parameters.fields),responses);

                }
                break;
        }
        console.log("responses");
        console.log(responses);
        return responses;
    },
    saveUserQueries: async function(fields){
        const registration = new Registration({
            name: fields.name.stringValue,
            email: fields.email.stringValue,
        });
        try{
            let reg = await registration.save();
            //console.log(reg);
            console.log(invalidMessage);
            return reg;
        } catch (err){
            console.log(err);
        }
    }
}
