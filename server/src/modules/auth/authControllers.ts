import { Request, Response } from 'express';
import tryCatch from '../../utils/tryCatch';
import { findUserById, login } from './authServices';
import { InternalError } from '../../errors';

const authenticateUser = tryCatch(async (req: Request, res: Response) => {
  const user = await findUserById(req.session.userId!);

  res
    .status(200)
    .json({ message: { firstName: user.firstName, lastName: user.lastName } });
});

const loginUser = tryCatch(async (req: Request, res: Response) => {
  const user = await login(req.body);
  req.session.userId = user.userId;

  res
    .status(200)
    .json({ message: { firstName: user.firstName, lastName: user.lastName } });
});

const logoutUser = tryCatch(async (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      throw new InternalError('Something went wrong');
    }

    res.clearCookie('littlethings_sid');
    return res.status(200).json({ message: 'Successfully logged out' });
  });
});

export { authenticateUser, loginUser, logoutUser };
