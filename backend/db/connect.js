//Loads the .env file so you can safely use process.env.MONGODB_URI for your MongoDB connection string without exposing it in code. .env keeps secrets like your database URI secure.
const dotenv = require('dotenv');
dotenv.config();

//Pulls in MongoDB’s client, which lets you connect to and interact with your database.
const MongoClient = require('mongodb').MongoClient;

//This variable will hold the active connection to the database after it's initialized.
//Using _db lets other parts of your app reuse the same database connection (instead of creating a new one every time).
let _db;

//If _db already exists, the function just returns it and avoids re-connecting.
const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  //Tries to connect to the MongoDB URI stored in your .env file.
  MongoClient.connect(process.env.MONGODB_URI)

  //If the connection works, it stores the database connection in _db and calls the callback (used in app.js to know when it’s safe to start the server).
    .then((client) => {
      _db = client;
      callback(null, _db);
    })

    //If something goes wrong connecting, it calls the callback with the error so you can log or handle it.
    .catch((err) => {
      callback(err);
    });
};

// const getDb = () => {
//   if (!_db) { //If someone tries to use the DB before initDb() was called, it throws an error to prevent crashing or undefined behavior.
//     throw Error('Db not initialized');
//   }
//   return _db; //Returns the database connection.
// };

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

//Makes both functions available to other files.
module.exports = {
  initDb,
  getDb,
};