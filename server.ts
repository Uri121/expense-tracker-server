import express from 'express';
import {
  logger,
  loggerMiddleWare,
  errorMiddleWare,
} from './src/middleware/logger';
import { connectDb } from './src/db/connect';
import 'dotenv/config';
import userRouter from './src/routes/user.route';

const port = process.env.PORT as string;

const app = express();
app.use(express.json());
app.use(loggerMiddleWare);
app.use('/api/user', userRouter);
app.use(errorMiddleWare);

app.listen(port, () => {
  logger.info(`🚀 Server is running at http://localhost:${port}`);
});

connectDb();
