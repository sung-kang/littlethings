import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ValidationRequestError } from '../errors';
import tryCatch from './tryCatch';

const validate = (validations: ValidationChain[]) => {
  return tryCatch(async (req: Request, _res: Response, next: NextFunction) => {
    for (const validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidationRequestError(errors.array());
    }

    next();
  });
};

export default validate;
