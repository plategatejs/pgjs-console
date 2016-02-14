'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import { Validator } from 'jsonschema';
import { Plate } from '../models';
import logger from '../logger';
import { badRequestHandler } from '../middleware';

const router = new Router();

router.get('/plates', (req, res, next) => {
  const projection = { __v: false, _id: false };

  Plate.find({}, projection, (error, plates) => {
    if (error) {
      return next(error);
    }

    return res.status(200).json(plates);
  });
});

router.delete('/plates/:identifier', (req, res, next) => {
  const { identifier } = req.params;

  Plate.remove({ identifier }, (error) => {
    if (error) {
      return next(error);
    }

    return res.status(200).end();
  });
});

router.post('/plates', bodyParser.json(), badRequestHandler, (req, res, next) => {
  const validation = (new Validator).validate(req.body, {
    type: 'object',
    properties: {
      identifier: {
        type: 'string',
        minLength: 3
      }
    },
    required: [
      'identifier'
    ]
  });

  if (validation.errors.length) {
    return res.status(400).end();
  }

  const plate = new Plate(req.body);

  plate.save((error) => {
    if (error) {
      return next(error);
    }

    return res.status(201).end();
  });
});

router.post('/plates/check', bodyParser.json(), badRequestHandler, (req, res, next) => {
  let plates = req.body;

  const validation = (new Validator).validate(plates, {
    type: 'array',
    items: { type: 'string' },
    minItems: 1
  });

  if (validation.errors.length) {
    return res.status(400).end();
  }

  logger.info(`checking plates: ${plates.join(', ')}.`);

  Plate.findOne({ identifier: { $in: plates } }, (error, plate) => {
    if (error) {
      return next(error);
    }

    if (!plate) {
      return res.status(403).end();
    }

    return res.status(200).json(plate.identifier);
  });
});

export default router;
