import { HttpStatus } from '@nestjs/common';

interface ErrorResponse {
  status: number;
  message: string;
  errorDetails?: any;
  stack?: string;
}

export function formatErrorResponse(err: any): ErrorResponse {
  const status = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Ocorreu um erro no servidor';
  const errorDetails = err.error || err.validationErrors || null;

  const errorResponse: ErrorResponse = {
    status,
    message,
    errorDetails,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };

  console.error(errorResponse);

  return errorResponse;
}

