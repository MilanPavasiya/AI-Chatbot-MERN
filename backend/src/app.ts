import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';

config();
const app = express();

// Middlewares
app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1');

export default app;
