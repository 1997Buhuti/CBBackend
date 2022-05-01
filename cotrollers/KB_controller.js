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
  const knowledgeTypes = `FAQ`;
  const mimeType = `text/csv`;

  // Instantiate a DialogFlow Documents client.
  const client = new dialogflow.DocumentsClient({
    projectId: projectID,
  });
  let knowledgeDocumentList=[];

  const addDocument = async (req ,res) => {
    try {
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
      const [operation] = await client.createDocument(request);
      const [response] = await operation.promise();
      res.status(200).send({
        message: "Uploaded the file successfully: " + response.name,
        url: response.contentUri
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Unable to create document!",
      });
    }
  };

    const deleteDocument = async (req ,res) =>{
      try{
        if(req.body.docName){
          const request = {
            name:req.body.docName,
          };
          const [operation] = await client.deleteDocument(request);
          const [response] = await operation.promise();
          if(response){
            res.status(200).send({
              message: "Deleted the file successfully: " + response.name,
              url: response.contentUri
            });
          }
          else{
            console.log("error");
            res.status(500).send({
              message: "Unable to delete document!",
            });
          }
        }

      }catch(err){
        console.log(err);
        res.status(500).send({
          message: "Unable to delete document!",
        });
      }
    };

    const callListDocuments= async (req,res)=> {
      // Construct request
      const request = {
        parent:knowledgeBaseFullName,
      };

      // Run request
      try{
        const iterable = await client.listDocumentsAsync(request);
        knowledgeDocumentList=[];
        for await (const response of iterable) {
          knowledgeDocumentList.push(response);
        }
        res.status(200).send({
          message: "Here is the Document list",
          payload:  knowledgeDocumentList,
        });
      } catch (err){
        console.log(err);
        res.status(500).send({
          message: "Unable to list all the documents!",
        });
      }

    }

  module.exports = {
    addDocument,
    deleteDocument,
    callListDocuments
  }


