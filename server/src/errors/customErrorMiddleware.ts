import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';
import config from '../utils/config';

const customErrorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof CustomError) {
    const { statusCode, errors } = err;

    if (config.ENV === 'development') {
      console.error(
        JSON.stringify({ code: statusCode, errors, stack: err.stack }, null, 2)
      );
    }

    const responseData =
      config.ENV === 'development'
        ? { code: statusCode, errors, stack: err.stack }
        : { errors };

    res.status(statusCode).json(responseData);
  } else {
    res.status(500).json({ errors: [{ message: 'Something went wrong' }] });
  }
};

export default customErrorMiddleware;
