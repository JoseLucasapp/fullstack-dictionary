require('dotenv').config();
require("./config/db")();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Fullstack Challenge 🏅 - Dictionary"
    });
});

require("./routes/index")(app);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})