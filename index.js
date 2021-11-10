const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./routes/dialogFlowRoutes')
app.use(bodyParser.json());

app.listen(5000);
