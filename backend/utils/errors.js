export class CustomError extends Error {
  constructor(name, statusCode, message) {
    super(message);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends CustomError {
  constructor(message) {
    super("BadRequestError", 400, message ?? "The request could not be processed due to missing or invalid input.");
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super("NotFoundError", 404, message ?? "Requested resource was not found.");
  }
}
