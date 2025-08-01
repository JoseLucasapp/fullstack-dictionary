require("dotenv").config();

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
module.exports = () => mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error(err));