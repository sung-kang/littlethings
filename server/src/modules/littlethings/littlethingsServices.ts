import { db } from '../../db/index';
import { InferInsertModel, eq, and } from 'drizzle-orm';
import { littlethings } from '../../db/schema';
import { InternalError, NotFoundError, UnauthorizedError } from '../../errors';

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

const updateLittleThingsPostById = async (
  userId: string,
  id: string,
  littlethingsData: InferInsertModel<typeof littlethings>
) => {
  const postExists = await db.query.littlethings.findFirst({
    where: (littlethings, { eq }) => eq(littlethings.id, id),
  });

  if (!postExists) {
    throw new NotFoundError();
  }

  if (postExists.user_id !== userId) {
    throw new UnauthorizedError('Not authorized to delete this post', 403);
  }

  const updatePostData = await db
    .update(littlethings)
    .set({
      description: littlethingsData.description,
      littlething: littlethingsData.littlething,
      occurence: littlethingsData.occurence,
      frequency: littlethingsData.frequency,
    })
    .where(eq(littlethings.id, id));

  return updatePostData;
};

const deleteLittleThingsById = async (userId: string, id: string) => {
  const checkingIfPostExists = await db.query.littlethings.findFirst({
    where: (littlethings, { eq }) => eq(littlethings.id, id),
  });

  if (!checkingIfPostExists) {
    throw new NotFoundError();
  }

  if (checkingIfPostExists.user_id !== userId) {
    throw new UnauthorizedError('Not authorized to delete this post', 403);
  }

  const deletedPostId = await db
    .delete(littlethings)
    .where(and(eq(littlethings.id, id)))
    .returning({ id: littlethings.id });

  return deletedPostId;
};

export {
  createLittleThings,
  getAllLittleThingsByUserId,
  updateLittleThingsPostById,
  deleteLittleThingsById,
};
