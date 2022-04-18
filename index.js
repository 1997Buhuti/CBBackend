const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require ('cors');
app.use(cors());
require('./routes/dialogFlowRoutes')(app);

app.listen(process.env.PORT||5000);

