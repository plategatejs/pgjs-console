'use strict';

import logger from './logger';

export function notFoundHandler(req, res) {
  return res.status(404).end();
}

export function badRequestHandler(error, req, res, next) {
  return res.status(400).end();
}

export function internalServerErrorHandler(error, req, res, next) {
  logger.error(error);
  return res.status(500).end();
}
