const asyncHandler = require("express-async-handler");
const contact = require("../models/contactModel");

//@desc get all contacts
//@route Get /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const Contacts = await contact.find({ user_id: req.user.id });
    res.status(200).send({
        success: true,
        TotalContact: Contacts.length,
        Contacts
    });
});

//@desc Create New contacts
//@route POST /api/contacts
//@access private
const CreateContact = asyncHandler(async (req, res) => {

    console.log("this is the request :", req.body);

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400).send({
            success: false,
            message: "All field are mandotry"
        });
        throw new Error("All field are mandotry");
    }
    const Contacts = await contact.create({ name, email, phone, user_id: req.user.id });
    res.status(201).send({
        success: true,
        message: "Contact Added Successfully",
        Contacts
    });
});

//@desc Get contact
//@route get /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const Contacts = await contact.findById(req.params.id);
    if (!contact.findById(req.params.id)) {
        res.status(404).send({
            success: false,
            message: "Contact Not found "
        });
        throw new Error("Contact Not found");
    }
    res.status(200).send({
        success: true,
        Contacts
    });
});

//@desc Update  New contacts
//@route Put /api/contacts/updateContact
//@access private
const UpdateContact = asyncHandler(async (req, res) => {

    const Contacts = await contact.findById(req.params.id);

    if (!Contacts) {
        res.status(404).send({
            success: false,
            message: "Contact Not found "
        });
        throw new Error("Contact Not found");
    }

    const { user_id, name, email, phone } = req.body;
    if (!user_id || !name || !email || !phone) {
        res.status(400).send({
            success: false,
            message: "All field are mandotry"
        });
        throw new Error("All field are mandotry");
    }
    // User ID Validation
    if (Contacts.user_id.toString() !== req.body.user_id) {
        res.status(403).send({
            success: false,
            message: "User is not authorized to updated other user contact"
        });
        throw new Error("User is not authorized to updated other user contact");
    }
    // // Email Validation
    // if (Contacts.email.toString() !== req.body.email) {
    //     res.status(403).send({
    //         success: false,
    //         message: "Email is Already Registered"
    //     });
    //     throw new Error("Email is Already Registered");
    // }
    const UpdateContact = await contact.findByIdAndUpdate(req.params.id, { name, email, phone }, { new: true });
    res.status(200).send({
        success: true,
        message: "Contact Update Successfully",
        UpdateContact
    });;
});

//@desc delete contacts
//@route DELETE /api/contacts/:id
//@access private
const DeleteContact = asyncHandler(async (req, res) => {

    const Contacts = await contact.findById(req.params.id);
    if (!Contacts) {
        res.status(400).send({
            success: false,
            message: "Contact Not Found"
        });
        throw new Error("Contact Not found");
    }

    const removeContact = await contact.findByIdAndDelete(req.params.id);
    res.status(200).send({
        success: true,
        message: "Contact Deleted Successfuly",
        removeContact
    });
});

module.exports = { CreateContact, getContacts, getContact, UpdateContact, DeleteContact };