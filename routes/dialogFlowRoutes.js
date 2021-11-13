const dialogflow = require('@google-cloud/dialogflow');
const config = require('../Config/keys');
const chatbot = require ('../ChatBot/chatbot');
//const sessionClient = require("dialogflow");
const SessionClient = new dialogflow.SessionsClient({ keyFilename: "C:\\Users\\dpman\\Downloads\\q-a-phem-973539eb86f5.json" });
//const SessionPath = SessionClient.sessionPath(config.googleProjectId, config.dialogflowSessionId);
//const SessionPath = SessionClient.sessionPath(config.googleProjectId, config.dialogflowSessionId);

module.exports = app => {

    app.get('/', (req, res) => {
        res.send("Hello World");
    });

    app.post('/api/df_text_query', async (req, res) => {
            let sessionPath=SessionClient.projectAgentSessionPath(config.googleProjectId, config.dialogflowSessionId)
            const request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        text:req.body.text,
                        languageCode: config.dialogflowSessionLanguageCode
                    },
                }
            };

            let responses = await SessionClient.detectIntent(request);
            res.send(responses[0].queryResult);
    });

    app.post('/api/df_event_query', async (req, res) => {
        let responses= await chatbot.eventQuery(req.body.event, res.parameters );
    });


}
