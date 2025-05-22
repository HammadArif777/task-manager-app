class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";

    // Captures stack trace excluding constructor
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
