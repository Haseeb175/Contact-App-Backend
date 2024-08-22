const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const ValidateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authheader = req.headers.Authorization || req.headers.authorization;
    if (authheader && authheader.startsWith("bearer")) {
        token = authheader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    success: false,
                    message: "user is not authorization"
                });
                throw new Error("user is not authorization");
            }
            req.user = decoded.user;
            next();
        });
        if (!token) {
            res.status(401).send({
                success: false,
                message: "user is not authorized or ticket is missing"
            });
            throw new Error("user is not authorized or ticket is missing");
        }
    }
});

module.exports = ValidateToken;