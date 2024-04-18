import { CustomError, type CustomErrorData } from './CustomError';

class NotFoundError extends CustomError {
  readonly statusCode = 404;
  public readonly errors: CustomErrorData[];

  constructor(message: string = 'Resource Not Found') {
    super(message);
    this.errors = [{ message }];
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
