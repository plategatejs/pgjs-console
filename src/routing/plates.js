'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import { Validator } from 'jsonschema';
import { Plate } from '../models';
import logger from '../logger';
import { badRequestHandler } from '../middleware';

const router = new Router();

router.get('/plates/:identifier', (req, res, next) => {
  const { identifier } = req.params;
  const projection = { __v: false, _id: false };

  Plate.findOne({ identifier }, projection, (error, plate) => {
    if (error) {
      return next(error);
    }

    if (!plate) {
      return res.status(404).end();
    }

    return res.status(200).json(plate).end();
  });
});

router.post('/plates/check', bodyParser.json(), badRequestHandler, (req, res, next) => {
  let plates = req.body;

  const validation = (new Validator).validate(plates, {
    type: 'array',
    items: { type: 'string' }
  });

  if (validation.errors.length) {
    return res.status(400).end();
  }

  Plate.findOne({ identifier: { $in: plates } }, (error, plate) => {
    if (error) {
      return next(error);
    }

    if (!plate) {
      return res.status(403).end();
    }

    return res.status(200).end();
  });
});

export default router;
