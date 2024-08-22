const express = require("express");
const { registeruser, loginuser, currentuser } = require("../Controller/userController");
const ValidateToken = require("../Middleware/ValidateTokenHandler");

const router = express.Router();

// Create User || POST
router.post("/register", registeruser).post("/login", loginuser)

// Current User || GET
router.get("/current", ValidateToken, currentuser);

module.exports = router;