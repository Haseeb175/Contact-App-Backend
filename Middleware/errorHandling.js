const { constants } = require("../constants");

const errorHandling = (err, req, res, next) => {
    const statusCode = res.status ? res.status : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation error", message: err.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server error", message: err.message, stackTrace: err.stack });
            break;
        default:
            console.log("No Error ,, All Function work Properly")
            break;
    }
};

module.exports = errorHandling;