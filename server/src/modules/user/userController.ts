import { Request, Response } from 'express';
import tryCatch from '../../utils/tryCatch';
import { createUser } from './userService';

const registerUser = tryCatch(async (req: Request, res: Response) => {
  const user = await createUser(req.body);

  res.status(201).json({ user });
});

export default registerUser;
