import express, { Express } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from './middlewares/errorHandler';
import candidatesRoutes from './routes/candidatesRouter';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);

const { CLIENT_URL } = process.env;

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/v1/', candidatesRoutes);
app.use(errorHandler);

export { app, httpServer };
