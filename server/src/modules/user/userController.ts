import { Request, Response } from 'express';
import tryCatch from '../../utils/tryCatch';
import { createUser, deleteUserAccount } from './userService';
import { InternalError } from '../../errors';

const deleteUser = tryCatch(async (req: Request, res: Response) => {
  await deleteUserAccount(req.session.userId!, req.body.password);

  req.session.destroy((error) => {
    if (error) {
      throw new InternalError('Something went wrong');
    }

    res.clearCookie('littlethings_sid');
    return res
      .status(200)
      .json({ message: 'Successfully deleted user account' });
  });
});

const registerUser = tryCatch(async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  req.session.userId = user.id;

  res.status(201).json({ user });
});

export { deleteUser, registerUser };
