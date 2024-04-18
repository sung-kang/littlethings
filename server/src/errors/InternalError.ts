import { CustomError, type CustomErrorData } from './CustomError';

class InternalError extends CustomError {
  readonly statusCode = 500;
  public readonly errors: CustomErrorData[];

  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.errors = [{ message }];
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}

export default InternalError;
