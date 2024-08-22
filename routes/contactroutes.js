const express = require("express");

const { getContacts, CreateContact, getContact, UpdateContact, DeleteContact } = require("../Controller/contactController");
const ValidateToken = require("../Middleware/ValidateTokenHandler");

const router = express.Router();
//route 

// Create Contact || POST
router.post('/addContact', ValidateToken, CreateContact);

// Get All Contacts || GET
router.get('/getAll', ValidateToken, getContacts);

// Get Contact By ID || GET
router.get('/get/:id', ValidateToken, getContact);

// Update Contact By ID || PUT
router.put('/updateContact/:id', ValidateToken, UpdateContact);

// Delete Contact By ID || DELETE
router.delete('/deleteContact/:id', ValidateToken, DeleteContact);

module.exports = router;