'use strict';

import Express from 'express';
import config from 'config';
import routing from './routing';

export default () => {
  const app = new Express();
  const port = config.get('http.port');

  app
    .disable('x-powered-by')
    .use(routing)
    .use((req, res) => res.status(404).send())
    .listen(port, () => console.log(`server up on port ${port}`));
};
