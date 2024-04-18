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

const getLittleThingPosts = async (userId: string) => {
  const dataPosts = await db.query.littlethings.findMany({
    where: (littlethings, { eq }) => eq(littlethings.user_id, userId),
  });

  console.log('TESTESTSTEST', dataPosts);

  return dataPosts;
};

//This is refactored delete, it checks for owner before even trying to delete a post, which may be safer
const deleteLittleThingPost = async (userId: string, id: string) => {
  const ownerVerification = await db.query.littlethings.findFirst({
    where: (littlethings, { eq, and }) =>
      and(eq(littlethings.user_id, userId), eq(littlethings.id, id)),
  });

  if (!ownerVerification) {
    throw new UnauthorizedError();
  }
  const deletedPost = await db
    .delete(littlethings)
    .where(and(eq(littlethings.id, id), eq(littlethings.user_id, userId)))
    .returning({ userId: littlethings.user_id });

  console.log('checking for deltedpost', deletedPost);
  return deletedPost;
};

/**
 *
 * this is the old delete, it was able to succeed if the user_id didn't match, like it will return the success json message in Controllers
 * HOWEVER,it wouldn't delete anything as there is no single match, and so if the deletedPost array is length of 0
 * we will catch Unauthorizederror, but is that safe, like allowing a potential delete to happen, but it would never happen cause no match?
 *
 *  const deletedPost = await db
    .delete(littlethings)
    .where(and(eq(littlethings.id, id), eq(littlethings.user_id, userId)))
    .returning({ userId: littlethings.user_id });

    if (deletedPost.length === 0) {
      throw new UnauthorizeError()
    }
 */

export { createLittleThings, getLittleThingPosts, deleteLittleThingPost };
