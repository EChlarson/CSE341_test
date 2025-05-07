const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET - Fetch all contacts
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb().db();
    const contacts = await db.collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// GET - Fetch single contact by ID
const getSingle = async (req, res) => {
  try {
    const db = mongodb.getDb().db();
    const contactId = new ObjectId(req.params.id);
    const contact = await db.collection('contacts').findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// POST - Create new contact
const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const db = mongodb.getDb().db();
    const response = await db.collection('contacts').insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ error: 'Failed to create contact' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// PUT - Update contact by ID
const updateContact = async (req, res) => {
  try {
    const db = mongodb.getDb().db();
    const contactId = new ObjectId(req.params.id);
    const updateData = req.body;

    const result = await db.collection('contacts').updateOne(
      { _id: contactId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Delete contact by ID
const deleteContact = async (req, res) => {
  try {
    const db = mongodb.getDb().db();
    const contactId = new ObjectId(req.params.id);

    const result = await db.collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};