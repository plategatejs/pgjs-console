'use strict';

import { Router } from 'express';
import request from 'request';
import config from 'config';
import logger from '../logger';

const router = new Router();

router.get('/gate/open', (req, res) => {
  const gate = config.get('gate');
  const options = {
    method: 'get',
    url: `${gate}/open`
  };

  request(options)
    .on('response', () => res.status(200).end())
    .on('error', error => next(error));
});

export default router;
