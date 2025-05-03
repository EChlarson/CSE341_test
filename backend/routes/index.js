//Imports Express and creates a router object using express.Router(). This lets you group related routes (like /contacts) and export them cleanly.
const express = require('express');
const router = express.Router();

//This tells Express: For any route that starts with /contacts, use the routing logic defined in routes/contacts.js.
router.use('/contacts', require('./contacts'))

//This exports the router so it can be used in app.js.
module.exports = router;