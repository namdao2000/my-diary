import './utils/loadenv';
import './helpers/db-wrapper.helper';
import app from './server';
import logger from './utils/logger';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`My Diary API server started on port: ${PORT}`);
});
