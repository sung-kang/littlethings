import { Request, Response, NextFunction } from 'express';

const tryCatch = (
  middleware: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void | Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(middleware(req, res, next)).catch(next);
  };
};

export default tryCatch;
