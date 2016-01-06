'use strict';

import { Router } from 'express';

const router = new Router();

router.get('/plates/:plate', (req, res) => {
  res.status(200).end();
});

export default router;
