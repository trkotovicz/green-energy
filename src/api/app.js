require('express-async-errors');
const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../api/middlewares/error');

const app = express();

app.use(express.json());
app.use(cors());


app.use(errorMiddleware);

module.exports = app;
