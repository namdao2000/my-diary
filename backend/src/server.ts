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
import { DB } from './helpers/db-wrapper.helper';
import { SQL_STATEMENTS } from './data-layer/sql-statements';
import { AuthRouter } from './routes/auth.routes';

const app = express();

// user's Content-Type has to be application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security
app.use(helmet());

// TODO: save the response in the res object.

// Adding routes.
app.use(BASE_URL, AuthRouter);

// Logging requests. This comes here because we need to get res.StatusCode
app.use(logging);

DB.run(SQL_STATEMENTS.initialiseDatabase);

export default app;
