const express = require("express");
const errorHandling = require("./Middleware/errorHandling");
const Connectdb = require("./Config/dbConnection");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");

Connectdb();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 5000;

app.use('/api/user', require('./routes/useroutes'));
app.use('/api/contacts', require('./routes/contactroutes'));
app.use(errorHandling);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
