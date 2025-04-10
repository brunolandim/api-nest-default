import { Response } from 'express';

interface ApiResponse<T> {
  message: string;
  status: number;
  data?: T;
  error?: any;
}

export default class ApiResponseHandler {
  public static success<T>(res: Response, data: T, status = 200, message = 'Operação realizada com sucesso'): void {
    const response: ApiResponse<T> = {
      message,
      status,
      data,
    };

    res.status(status).json(response);
  }

  public static error(res: Response, message: string, status: number = 500, error: any): void {
    const response: ApiResponse<null> = {
      message,
      status,
      error,
      data: null,
    };

    res.status(status).json(response);
  }
}
