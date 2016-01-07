'use strict';

import { Schema } from 'mongoose';
import crypto from 'crypto';
import connection from '../mongodb'

const HASH_ALGORITHM = 'sha256';

const hash = (password) => {
  return crypto
    .createHash(HASH_ALGORITHM)
    .update(password)
    .digest('hex');
};

const schema = new Schema({
  name: String,
  password: String
});

schema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = hash(this.password);
  next();
});

schema.methods.comparePassword = function (password) {
  return hash(password) === this.password;
};

export default connection.model('User', schema);
