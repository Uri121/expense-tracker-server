import express from 'express';
import { logger, loggerMiddleWare, errorMiddleWare } from './src/middleware/logger';
import { connectDb } from './src/db/connect';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import userRouter from './src/routes/user.route';
import config from './src/config/default.config';
import incomeRouter from './src/routes/income.route';

const { port } = config;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleWare);
app.use('/api/user', userRouter);
app.use('/api/income', incomeRouter);
app.use(errorMiddleWare);

app.listen(port, () => {
  logger.info(`🚀 Server is running at http://localhost:${port}`);
});

connectDb();
