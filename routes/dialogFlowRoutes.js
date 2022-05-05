
//const config = require('../Config/keys');
const chatbot = require ('../ChatBot/chatbot');
const cors = require('cors')
const controller = require("../cotrollers/controller");
const KB_controller = require("../cotrollers/KB_controller");


//const sessionClient = require("dialogflow");
//const SessionClient = new dialogflow.SessionsClient({ keyFilename: "C:\\Users\\dpman\\Downloads\\q-a-phem-973539eb86f5.json" });
//const SessionPath = SessionClient.sessionPath(config.googleProjectId, config.dialogflowSessionId);
//const SessionPath = SessionClient.sessionPath(config.googleProjectId, config.dialogflowSessionId);

module.exports = app => {

    app.get('/', (req, res) => {
        res.send("Hello World");
    });

    app.post('/api/df_text_query', async (req, res) => {
            let responses = await chatbot.textQuery(req.body.text, req.body.userId, req.body.parameters)
            res.send(responses[0].queryResult);
    });

    app.post('/api/df_event_query', cors(), async (req, res) => {
        let responses= await chatbot.eventQuery(req.body.event, req.body.userId, res.parameters );
        res.send(responses[0].queryResult);
    });

    //API endpoint for uploading files
    app.post("/api/upload", controller.upload);
    //API endpoint for getting file list
    app.get("/api/files", controller.getListFiles);
    //API endpoint for uploading file by name
    app.get("/api/files/:name", controller.download);
    //API endpoint for uploading KnowledgeBase file
    app.post("/api/uploadKB",KB_controller.addDocument);
    //API endpoint for deleting KnowledgeBase file
    app.post("/api/deletedKB",KB_controller.deleteDocument);
    //API endpoint for getting all KnowledgeBase files
    app.get("/api/getallKB",KB_controller.callListDocuments);
    //API endpoint for getting single KnowledgeBase file
    app.get("/api/getKB",KB_controller.callListDocuments);
}
