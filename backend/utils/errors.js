export class CustomError extends Error {
  constructor(name, statusCode, message, errors) {
    super(message);

    this.name = name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CustomError {
  constructor(errors, message) {
    super("ValidationError", 400, message ?? "The request could not be processed due to missing or invalid input.", errors);
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super("NotFoundError", 404, message ?? "Requested resource was not found.");
  }
}
