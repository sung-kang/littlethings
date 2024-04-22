import { Request, Response } from 'express';
import tryCatch from '../../utils/tryCatch';
import { createUser, deleteUserAccount } from './usersServices';
import { InternalError } from '../../errors';

const deleteUser = tryCatch(async (req: Request, res: Response) => {
  await deleteUserAccount(req.session.userId!, req.body.password);

  req.session.destroy((error) => {
    /* istanbul ignore next */
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
  req.session.userId = user.userId;

  res.status(201).json({
    message: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
});

export { deleteUser, registerUser };
