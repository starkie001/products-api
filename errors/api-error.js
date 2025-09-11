export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ValidationError extends ApiError {
  constructor(message) {
    super(400, message);
  }
}