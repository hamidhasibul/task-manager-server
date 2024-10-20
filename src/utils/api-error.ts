class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public isOperational: boolean;

  constructor(message: string = "Something went wrong", statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
