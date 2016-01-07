'use strict';

import connection from '../mongodb'

export default connection.model('Plate', {
  identifier: String
});
