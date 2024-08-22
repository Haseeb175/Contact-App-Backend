const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc register the user
//@route post /api/user/register
//@access public 
const registeruser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).send({
            success: false,
            message: "please fill all the details"
        });
    };

    const userAvaiable = await User.findOne({ email });
    if (userAvaiable) {
        res.status(400).send({
            success: false,
            message: "User Already Register"
        });
        throw new Error("User already register");
    }

    // hash Password
    const hashpassword = await bcrypt.hash(password, 10);
    console.log("hash password :", hashpassword);

    const user = await User.create({
        name,
        email,
        password: hashpassword,
    });

    console.log(`user created ${user}`);

    // if (user) {
    //     res.status(201).json({ user })
    // } else {
    //     res.status(400)
    //     throw new error("User data is not valid");
    // }
    res.status(201).send({
        success: true,
        message: "register the user ",
        user
    });
});

//@desc login user 
//@route post /api/user/register
//@access public
const loginuser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send({
            success: false,
            message: "Please Provide Email and Password"
        });
        throw new Error("all field are mandatory");
    }

    const user = await User.findOne({ email });

    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "7d" });

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            accessToken,
            user
        });
    } else {
        res.status(401).send({
            success: false,
            message: "Email or password is incorrect"
        })
        throw new Error("Email or password is incorrect")
    }
});
//@desc currentuser 
//@route get /api/user/current
//@access private 
const currentuser = asyncHandler(async (req, res) => {

    res.json(req.user);
});


module.exports = { registeruser, loginuser, currentuser };