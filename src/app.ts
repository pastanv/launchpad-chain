import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { morganMiddleware, globalErrorHandler } from 'middlewares';
import { checkForMandatoryEnvVars } from 'configs/constants';

checkForMandatoryEnvVars();
export const app = express();

app.use(morganMiddleware);
app.use(cors());
app.use(helmet());

app.get('/health', (_req, res, next) => {
  try {
    const healthData = {
      message: 'OK',
      uptime: process.uptime(),
      date: new Date(),
    };
    res.send(healthData);
  } catch (error) {
    return next(error);
  }
});

app.use(globalErrorHandler);
