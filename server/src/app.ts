import express, { Express } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Express = express();
const httpServer = createServer(app);

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

export { app, httpServer };
