import bcrypt from 'bcryptjs';
import { db } from '../../db/index';
import { UnauthorizedError } from '../../errors';
import { loginData } from './authTypes';

const findUserById = async (userId: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  /* istanbul ignore next */
  if (!user) {
    throw new UnauthorizedError();
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

const login = async (userData: loginData) => {
  const { email, password } = userData;

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError('Invalid email or password');
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    userId: user.id,
  };
};

export { findUserById, login };
