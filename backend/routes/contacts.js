//Sets up a router object using Express.
const express = require('express');
const router = express.Router();

//Imports the logic for handling these routes from the controllers/contacts.js file.
//This keeps your route definitions clean while putting the actual “work” (database queries, data processing, etc.) in a separate controller file.
const contactsController = require('../controllers/contacts');

//Handles GET requests to /contacts
//Calls contactsController.getAll to fetch all contacts from the database.
router.get('/', contactsController.getAll);

//Calls contactsController.getSingle to fetch one specific contact based on the ID.
//:id is a route parameter, like /contacts/12345
router.get('/:id', contactsController.getSingle);

//Exports this router so it can be used in index.js, which then plugs into app.js.
module.exports = router;