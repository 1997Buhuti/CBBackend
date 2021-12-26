const express = require('express');
const app = express();
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

const cors = require('cors');
app.use(cors({
    origin: 'https://www.section.io'
}));
//const bodyParser = require('body-parser');
//app.use(bodyParser.json());
//app.use(cors({origin: '*'})
//);
require('./routes/dialogFlowRoutes')(app);

app.listen(process.env.PORT||5000);

