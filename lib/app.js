import express from 'express';
import beersController from '../lib/controllers/beers.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
});
app.use(beersController);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
