const express = require('express');
require("dotenv").config();
const router = require('./route/routes');

const connect = require('./utils/connect');
connect();

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use("/generate", router)



app.get('/', (req, res) => {
    res.send("Hello World");
})
app.listen(PORT, () => {
    console.log(`Started server at ${PORT}`);
})