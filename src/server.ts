import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './docs/swagger.config';
import errorHandler from './middlewares/error';
import eligibilityRouter from './routes/Eligibility';

const app = express();

app.use(express.json());
app.use(cors());

const swaggerDoc = swaggerJSDoc(swaggerConfig);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(eligibilityRouter);

app.use(errorHandler);

const PORT = process.env.APP_PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

export default app;
