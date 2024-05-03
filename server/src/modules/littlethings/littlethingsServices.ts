import { db } from '../../db/index';
import { InferInsertModel, eq, and } from 'drizzle-orm';
import { littlethings } from '../../db/schema';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from '../../errors';

const createLittleThings = async (
  userId: string,
  littleThingsData: InferInsertModel<typeof littlethings>
) => {
  const littlethingPost = await db
    .insert(littlethings)
    .values({ ...littleThingsData, user_id: userId })
    .returning({
      id: littlethings.id,
      description: littlethings.description,
      littlething: littlethings.littlething,
      frequency: littlethings.frequency,
      occurrence: littlethings.occurrence,
      completionCount: littlethings.completionCount,
      createdAt: littlethings.createdAt,
      updatedAt: littlethings.updatedAt,
    });

  /* istanbul ignore next */
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
    throw new NotFoundError(
      'Cannot find the post or the post is already deleted'
    );
  }

  if (postExists.user_id !== userId) {
    throw new UnauthorizedError('Not authorized to update this post', 403);
  }

  const fieldsToUpdate = [
    'description',
    'littlething',
    'occurrence',
    'frequency',
  ] as const;

  const updateFields = fieldsToUpdate.reduce<Record<string, string | number>>(
    (acc, field) => {
      if (littlethingsData[field] !== undefined) {
        acc[field] = littlethingsData[field];
      }

      return acc;
    },
    {}
  );

  const updatePostData = await db
    .update(littlethings)
    .set({ ...updateFields, updatedAt: new Date() })
    .where(eq(littlethings.id, id))
    .returning({
      id: littlethings.id,
      description: littlethings.description,
      littlething: littlethings.littlething,
      frequency: littlethings.frequency,
      occurrence: littlethings.occurrence,
      completionCount: littlethings.completionCount,
      createdAt: littlethings.createdAt,
      updatedAt: littlethings.updatedAt,
    });

  return updatePostData[0];
};

const deleteLittleThingsById = async (userId: string, id: string) => {
  const postExists = await db.query.littlethings.findFirst({
    where: (littlethings, { eq }) => eq(littlethings.id, id),
  });

  if (!postExists) {
    throw new NotFoundError(
      'Cannot find the post or the post is already deleted'
    );
  }

  if (postExists.user_id !== userId) {
    throw new UnauthorizedError('Not authorized to delete this post', 403);
  }

  const deletedPostId = await db
    .delete(littlethings)
    .where(and(eq(littlethings.id, id)))
    .returning({ id: littlethings.id });

  return deletedPostId[0].id;
};

const updateCompletionCount = async (userId: string, id: string) => {
  const postExists = await db.query.littlethings.findFirst({
    where: (littlethings, { eq }) => eq(littlethings.id, id),
  });

  if (!postExists) {
    throw new NotFoundError(
      'Cannot find the post or the post is already deleted'
    );
  }

  if (postExists.completionCount === postExists.occurrence) {
    throw new BadRequestError('Maximum completions reached!');
  }

  if (postExists.user_id !== userId) {
    throw new UnauthorizedError('Not authorized to delete this post', 403);
  }

  const incrementCompletion = await db
    .update(littlethings)
    .set({ completionCount: postExists.completionCount + 1 })
    .where(eq(littlethings.id, id))
    .returning();

  return incrementCompletion[0].completionCount;
};

export {
  createLittleThings,
  getAllLittleThingsByUserId,
  updateLittleThingsPostById,
  deleteLittleThingsById,
  updateCompletionCount,
};
