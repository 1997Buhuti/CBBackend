const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('./routes/dialogFlowRoutes')(app);

app.listen(process.env.PORT||5000);

// export GOOGLE_APPLICATION_CREDENTIALS="C:\Users\dpman\Downloads\q-a-phem-973539eb86f5.json"
//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\\Users\\dpman\\Downloads\\q-a-phem-973539eb86f5.json"
//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\dpman\Downloads\q-a-phem-973539eb86f5.json"
//set GOOGLE_APPLICATION_CREDENTIALS="C:\Users\dpman\Downloads\q-a-phem-973539eb86f5.json"
