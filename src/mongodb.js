'use strict';

import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

const url = `mongodb://${config.get('mongodb')}`;
const connection = mongoose.createConnection(url);

connection.on('connected', () => logger.info('connected to mongodb'));
connection.on('disconnected', () => logger.warn('disconnected from mongodb'));
connection.on('error', ({message}) => logger.error(`mongodb ${message}`));

export default connection;
