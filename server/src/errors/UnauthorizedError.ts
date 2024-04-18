import { CustomError, type CustomErrorData } from './CustomError';

class UnauthorizedError extends CustomError {
  readonly statusCode: number;
  public readonly errors: CustomErrorData[];

  constructor(message: string = 'Unauthorized', statusCode: number = 401) {
    super(message);
    this.statusCode = statusCode;
    this.errors = [{ message }];
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default UnauthorizedError;
