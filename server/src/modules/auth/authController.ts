import { Request, Response } from 'express';
import tryCatch from '../../utils/tryCatch';
import { login } from './authService';
import { InternalError } from '../../errors';

const loginUser = tryCatch(async (req: Request, res: Response) => {
  const user = await login(req.body);
  req.session.userId = user;

  res.status(200).json({ user });
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

export { loginUser, logoutUser };
