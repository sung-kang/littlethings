import { CustomError, type CustomErrorData } from './CustomError';

class UnauthorizedError extends CustomError {
  readonly statusCode = 401;
  public readonly errors: CustomErrorData[];

  constructor(message: string = 'Unauthorized') {
    super(message);
    this.errors = [{ message }];
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default UnauthorizedError;
