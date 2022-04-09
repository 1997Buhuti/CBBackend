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
  const documentPath = `gs://chatbot_knowledgebases/test.csv`;
  const documentName = ` test.csv`;
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
      displayName: documentName,
      contentUri: documentPath,
      source: 'contentUri',
      mimeType: mimeType,
    },
  };

  const operation = async (req, res) => {
    try{
      await client.createDocument(request);
      const response= await operation.promise(()=>{
        console.log('Document created');
        console.log(`Content URI...${response.contentUri}`);
        console.log(`displayName...${response.displayName}`);
        console.log(`mimeType...${response.mimeType}`);
        console.log(`name...${response.name}`);
        console.log(`source...${response.source}`);
      });

      console.log('Document created');
      console.log(`Content URI...${response.contentUri}`);
      console.log(`displayName...${response.displayName}`);
      console.log(`mimeType...${response.mimeType}`);
      console.log(`name...${response.name}`);
      console.log(`source...${response.source}`);
    }
    catch (err){
      console.log(err);
    }
  };

  module.exports = {
      operation,
  };
