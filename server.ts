import express from 'express';
import { logger, loggerMiddleWare } from './middleware/logger';
import { connectDb } from './db/connect';
import 'dotenv/config';

const port = process.env.PORT as string;

const app = express();
app.use(express.json());
app.use(loggerMiddleWare);

app.listen(port, () => {
  logger.info(`🚀 Server is running at http://localhost:${port}`);
});

connectDb();
