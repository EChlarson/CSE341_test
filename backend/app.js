//Importing Required Modules
const express = require('express'); //A web framework for Node.js used to build APIs and handle routes.
const bodyParser = require('body-parser'); //Middleware to parse incoming JSON in request bodies.
const MongoClient = require('mongodb').MongoClient; //From the MongoDB package; used to connect to your database (though not used directly here).

//Importing local modules
const mongodb = require('./db/connect'); //A custom module that handles the MongoDB connection logic.
const professionalRoutes = require('./routes/contacts'); //Handles the routes related to contacts (even though it isn't used directly—more on that below).

//Setting up the server
const port = process.env.PORT || 8080;//This defines the port your app will run on, using an environment variable if available (for deployment), or defaulting to 8080.
const app = express();

//Middleware Setup
app
  .use(bodyParser.json()) //bodyParser.json(): Allows Express to read req.body when data is sent in JSON format.
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next(); //The custom middleware adds a response header to allow Cross-Origin Resource Sharing (CORS) from any domain. This is important when your frontend and backend are on different domains/ports.
  })
  .use('/', require('./routes'));

  //Connecting to MongoDB and starting the server
mongodb.initDb((err, mongodb) => { //Calls the initDb function from your custom db/connect.js file.
  if (err) { //If there's an error connecting to the database, it logs the error and does not start the server.
    console.log(err);
  } else { //If the connection is successful, it starts the server and logs a success message.
    app.listen(port, '0.0.0.0');
    console.log(`Connected to DB and listening on ${port}`);
  }
});