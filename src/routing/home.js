'use strict';

import { Router } from 'express';
import config from 'config';
import { version } from '../../package.json';

const router = new Router();

router.get('/', (req, res) => res.json({version}).end());

export default router;
