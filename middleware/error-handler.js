import { ErrorResponse } from '../models/error-response.js';

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const errorResponse = new ErrorResponse({
    message: err.message || 'Internal Server Error',
    statusCode,
    //details: process.env.NODE_ENV !== 'production' ? err.stack : undefined
  });

  res.status(statusCode).json(errorResponse);
}