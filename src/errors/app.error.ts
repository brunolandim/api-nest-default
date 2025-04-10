class AppError extends Error {
  public statusCode: number;
  public validationErrors?: string[];

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;