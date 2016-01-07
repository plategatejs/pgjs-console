'use strict';

import { Router } from 'express';
import { Plate } from '../models';
import logger from '../logger';

const router = new Router();

router.get('/plates/:identifier', (req, res) => {
  const { identifier } = req.params;
  const projection = { __v: false, _id: false };

  Plate.findOne({identifier}, projection, (error, plate) => {
    if (error) {
      return res.status(500).end();
    }

    if (!plate) {
      return res.status(404).end();
    }

    return res.status(200).json(plate).end();
  });
});

export default router;
