require('express-async-errors');
const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../api/middlewares/error');
const router = require('./routes/eligibility');

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(errorMiddleware);

module.exports = app;
