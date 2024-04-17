import { CustomError, CustomErrorData } from './CustomError';
import { ValidationError } from 'express-validator';

class ValidationRequestError extends CustomError {
  readonly statusCode = 400;
  public readonly errors: CustomErrorData[];

  constructor(errors: ValidationError[]) {
    super('Validation Failed');
    this.errors = errors.map((error) => ({ message: error.msg }));
    Object.setPrototypeOf(this, ValidationRequestError.prototype);
  }
}

export default ValidationRequestError;
