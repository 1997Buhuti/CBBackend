const dialogflow = require('@google-cloud/dialogflow');
//const config = require('../Config/keys');
const chatbot = require ('../ChatBot/chatbot');
const cors = require('cors')
//const sessionClient = require("dialogflow");
//const SessionClient = new dialogflow.SessionsClient({ keyFilename: "C:\\Users\\dpman\\Downloads\\q-a-phem-973539eb86f5.json" });
//const SessionPath = SessionClient.sessionPath(config.googleProjectId, config.dialogflowSessionId);
//const SessionPath = SessionClient.sessionPath(config.googleProjectId, config.dialogflowSessionId);

module.exports = app => {

    app.get('/', (req, res) => {
        res.send("Hello World");
    });

    app.post('/api/df_text_query', async (req, res) => {
            console.log(req)
            let responses = await chatbot.textQuery(req.body.text, req.body.parameters)
            res.send(responses[0].queryResult);
            console.log(responses)
    });

    app.post('/api/df_event_query', cors(), async (req, res) => {
        let responses= await chatbot.eventQuery(req.body.event, res.parameters );
        res.send(responses[0].queryResult);
    });


}
