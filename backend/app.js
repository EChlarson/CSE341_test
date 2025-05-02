//Importing Required Modules
const express = require('express'); //A web framework for Node.js used to build APIs and handle routes.
const bodyParser = require('body-parser'); //Middleware to parse incoming JSON in request bodies.
const MongoClient = require('mongodb').MongoClient; //From the MongoDB package; used to connect to your database (though not used directly here).

//Importing local modules
const mongodb = require('./db/connect'); //A custom module that handles the MongoDB connection logic.
const professionalRoutes = require('./routes/contacts'); //Handles the routes related to contacts (even though it isn't used directly—more on that below).

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});