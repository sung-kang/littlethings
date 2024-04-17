import bcrypt from 'bcryptjs';
import { InferInsertModel } from 'drizzle-orm';
import { db } from '../../db/index';
import { users } from '../../db/schema';
import { BadRequestError } from '../../errors';

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
    .returning({ id: users.id });

  return user[0];
};

export { createUser };
