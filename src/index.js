'use strict';

import Express from 'express';
import config from 'config';
import logger from './logger';
import routing from './routing';

export default () => {
  const app = new Express();
  const port = config.get('http.port');

  app
    .disable('x-powered-by')
    .use(routing)
    .use((req, res) => res.status(404).send())
    .listen(port, () => logger.info(`server up on port ${port}`));
};
