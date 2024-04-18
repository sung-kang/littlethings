import { Request, Response } from 'express';
import tryCatch from '../../utils/tryCatch';
import { createUser } from './userService';

const registerUser = tryCatch(async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  req.session.userId = user.id;

  res.status(201).json({ user });
});

export { registerUser };
