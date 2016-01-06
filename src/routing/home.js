'use strict';

import { Router } from 'express';
import config from 'config';

const version = config.get('version');
const router = new Router();

router.get('/', (req, res) => res.json({version}).end());

export default router;
