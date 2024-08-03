const express = require('express');
require("dotenv").config();
const router = require('./route/routes');

const connect = require('./utils/connect');
const cors = require('cors');
connect();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/url", router)

app.use('/', router)



app.get('/', (req, res) => {
    res.send("Hello World");
})
app.listen(PORT, () => {
    console.log(`Started server at ${PORT}`);
})