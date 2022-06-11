const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require ('cors');
app.use(cors());
const mongoose=require('mongoose');
const config=require('./Config/keys')
app.use(express.json());
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "Products_DB",
    })
    .then(() => {
        console.log("Database Connection is ready...");
        console.log("Database_URL", process.env.DATABASE_URL);
    })
    .catch((err) => {
        console.log(err);
    });

require('./routes/dialogFlowRoutes')(app);

app.listen(process.env.PORT||5000);

