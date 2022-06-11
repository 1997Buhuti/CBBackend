module.exports = {
    googleProjectId: process.env.GOOGLE_PROJECT_ID,
    dialogflowSessionId: process.env.DIALOGFLOW_SESSION_ID,
    dialogflowSessionLanguageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: JSON.parse(process.env.GOOGLE_Private_Key),
    mongoURI:process.env.MONGODB_URI
}
