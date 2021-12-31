/**
 * This is the server.ts that will be imported in jest testing.
 * If I had more time, I would implement input validation using express-openapi-validator.
 * This package will validate input against openapi v3 specification. I call it Spec Driven Development (SDD).
 * Link to package: https://www.npmjs.com/package/express-openapi-validator
 */

import express from 'express';
import helmet from 'helmet';
import { logging } from './middleware/logging.middleware';
import { BASE_URL } from './utils/constants';
import { initialiseDatabase } from './helpers/database.helper';
import { AuthRouter } from './routes/auth.routes';
import { errorHandler } from './middleware/error-handler.middleware';
import { resJsonInterceptor } from './middleware/res-json-interceptor.middleware';
import { DiaryRouter } from './routes/diary.routes';
import cors from 'cors';

const app = express();

// user's Content-Type has to be application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Security
app.use(helmet());
app.use(logging);
app.use(resJsonInterceptor);

// Adding routes.
app.use(BASE_URL, AuthRouter);
app.use(BASE_URL, DiaryRouter);

// Logging requests. This comes here because we need to get res.StatusCode
app.use(errorHandler);
// Initialise the DB
initialiseDatabase();

export default app;
