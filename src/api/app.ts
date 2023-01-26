import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import errorMiddleware from './middlewares/error';
import router from './routes/eligibility';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(errorMiddleware);

module.exports = app;
