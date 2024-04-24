import bcrypt from 'bcryptjs';
import { InferInsertModel, eq } from 'drizzle-orm';
import { db } from '../../db/index';
import { users } from '../../db/schema';
import {
  BadRequestError,
  InternalError,
  UnauthorizedError,
} from '../../errors';

const changeUserPassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  const updatedPassword = await db
    .update(users)
    .set({ password: hashedNewPassword, updatedAt: new Date() });

  /* istanbul ignore next */
  if (updatedPassword.rowCount === 0) {
    throw new InternalError();
  }
};

const createUser = async (userData: InferInsertModel<typeof users>) => {
  const { firstName, lastName, email, password } = userData;

  const userExists = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (userExists) {
    throw new BadRequestError('User with entered email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db
    .insert(users)
    .values({ firstName, lastName, email, password: hashedPassword })
    .returning({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
    });

  return {
    firstName: user[0].firstName,
    lastName: user[0].lastName,
    userId: user[0].id,
    email: user[0].email,
  };
};

const deleteUserAccount = async (userId: string, password: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const deletedUser = await db.delete(users).where(eq(users.id, userId));

  /* istanbul ignore next */
  if (deletedUser.rowCount === 0) {
    throw new InternalError();
  }
};

export { changeUserPassword, createUser, deleteUserAccount };
