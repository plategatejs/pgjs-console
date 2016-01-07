'use strict';

import { Schema } from 'mongoose';
import connection from '../mongodb'

export default connection.model('Plate', {
  identifier: String
});
