'use strict';

import { Router } from 'express';
import home from './home'
import plates from './plates';
import gate from './gate';
import camera from './camera';

const router = new Router;

router.use(home, plates, gate, camera);

export default router;
