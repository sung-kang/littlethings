import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../errors';

const verifyAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.userId) {
    res.clearCookie('littlethings_sid');
    throw new UnauthorizedError();
  }

  next();
};

export { verifyAuthentication };
