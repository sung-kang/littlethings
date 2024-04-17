import { CustomError, CustomErrorData } from './CustomError';

class BadRequestError extends CustomError {
  readonly statusCode: number;
  public readonly errors: CustomErrorData[];

  constructor(message: string = 'Bad Request Error', statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.errors = [{ message }];
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export default BadRequestError;
