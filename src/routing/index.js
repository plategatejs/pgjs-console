'use strict';

import { Router } from 'express';
import home from './home'
import plates from './plates';

const router = new Router;

router.use(home, plates);

export default router;
