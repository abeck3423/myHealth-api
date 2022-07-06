const mongoose = require("mongoose");
const dotenv = require("dotenv");
// mongoose.connect("mongodb://localhost/myHealth-api");
// mongoose.connect("mongodb://127.0.0.1/myHealth-api")

dotenv.config();

//Connect to db
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to db"));

module.exports = mongoose;
