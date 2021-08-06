import express from 'express';
import beersController from '../lib/controllers/beers.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());

app.use(beersController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
