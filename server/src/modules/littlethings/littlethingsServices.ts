import { db } from '../../db/index';
import { InferInsertModel, eq, and } from 'drizzle-orm';
import { littlethings } from '../../db/schema';
import { InternalError, UnauthorizedError } from '../../errors';

const createLittleThings = async (
  userId: string,
  littleThingsData: InferInsertModel<typeof littlethings>
) => {
  const littlethingPost = await db
    .insert(littlethings)
    .values({ ...littleThingsData, user_id: userId })
    .returning();

  if (!littlethingPost) {
    throw new InternalError();
  }

  return littlethingPost[0];
};

const getAllLittleThingsByUserId = async (userId: string) => {
  const dataPosts = await db.query.littlethings.findMany({
    where: (littlethings, { eq }) => eq(littlethings.user_id, userId),
  });

  return dataPosts;
};

const deleteLittleThingsById = async (userId: string, id: string) => {
  const ownerVerification = await db.query.littlethings.findFirst({
    where: (littlethings, { eq, and }) =>
      and(eq(littlethings.user_id, userId), eq(littlethings.id, id)),
  });

  // finding post by post ID and checking userId against userId in found post data
  // and handling post not found error and/or unauthroized error
  // vs
  // just doing generic UnauthorizedError

  if (!ownerVerification) {
    throw new UnauthorizedError('Not authorized to delete this post', 403);
  }

  const deletedPostId = await db
    .delete(littlethings)
    .where(and(eq(littlethings.id, id), eq(littlethings.user_id, userId)))
    // .returning({ userId: littlethings.user_id });
    .returning({ id: littlethings.id });

  return deletedPostId;
};

export {
  createLittleThings,
  getAllLittleThingsByUserId,
  deleteLittleThingsById,
};
