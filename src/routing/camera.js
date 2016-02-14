'use strict';

import { Router } from 'express';
import request from 'request';
import config from 'config';

const router = new Router();

router.get('/camera', (req, res, next) => {
  const url = config.get('camera');
  const options = {
    method: 'get',
    url
  };

  request(options)
    .on('error', error => next(error))
    .pipe(res);
});

export default router;
