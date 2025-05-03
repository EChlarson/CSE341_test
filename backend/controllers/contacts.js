const mongodb = require('../db/connect'); //Imports your custom database connection module.
const ObjectId = require('mongodb').ObjectId; //Lets you work with MongoDB's _id field, which is a special object type (not just a string).

const getAll = async (req, res, next) => { //Connects to the contacts collection in the database.
  const result = await mongodb.getDb().db().collection('contacts').find(); //Runs .find() to get all documents (contacts).
  result.toArray().then((lists) => { //Converts the results into an array with .toArray().
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); //Sends the array back to the client as a JSON response.
  });
};

const getSingle = async (req, res, next) => { 
  const userId = new ObjectId(req.params.id); // Convert the id from the request params to a MongoDB ObjectId

  // Access the database and search the 'contacts' collection for a document with that _id
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });

  // Convert the result (a cursor) to an array  
  result.toArray().then((lists) => {
    // Set the response header to indicate JSON content
    res.setHeader('Content-Type', 'application/json');
    // Send the first (and only) result back to the client with a 200 OK status
    res.status(200).json(lists[0]);
  });
};

module.exports = { getAll, getSingle };