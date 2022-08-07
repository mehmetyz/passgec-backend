const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config({
    path: __dirname + '/.env'
});



const mongoose = require('./common/mongoose');

const PORT = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';


app.use(bodyParser.json());
app.use(cors());


app.use("/api/v1/user", require("./routes/user.routes"));
app.use("/api/v1/notification", require("./routes/notification.routes"));
app.use("/api/v1/flight", require("./routes/flight.routes"));
app.use("/api/v1/management", require("./routes/management.routes"));


app.listen(PORT, host, () => {
    console.log(`Server running at http://${host}:${PORT}/`);
});
