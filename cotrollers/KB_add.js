  // Imports the Dialogflow client library
  const dialogflow = require('@google-cloud/dialogflow').v2beta1;
  const config = require('../Config/keys');
  const structjson = require('structjson');

  const credentials = {
      client_email: config.googleClientEmail,
      private_key: config.googlePrivateKey
  }

  const projectID = config.googleProjectId;
  const knowledgeBaseFullName = `projects/q-a-phem/knowledgeBases/MzQyOTc0MDcwNTM4MjEzNzg1Ng`;
  //const documentPath = `gs://chatbot_knowledgebases/test2.csv`;
  //const documentName = ` test2.csv`;
  const knowledgeTypes = `FAQ`;
  const mimeType = `text/csv`;

  // Instantiate a DialogFlow Documents client.
  const client = new dialogflow.DocumentsClient({
    projectId: projectID,
  });
  const request = {
    parent: knowledgeBaseFullName,
    document: {
      knowledgeTypes: [knowledgeTypes],
      displayName: "",
      contentUri: "",
      source: 'contentUri',
      mimeType: mimeType,
    },
  };


  module.exports = {
    operation : async (req) => {
      try{
        const request = {
          parent: knowledgeBaseFullName,
          document: {
            knowledgeTypes: [knowledgeTypes],
            displayName: req.body.documentName,
            contentUri: req.body.documentPath,
            source: 'contentUri',
            mimeType: mimeType,
          },
        };
        console.log("request", request);
        await client.createDocument(request);
      }
      catch (err){
        console.log(err);
      }
    }
  };
