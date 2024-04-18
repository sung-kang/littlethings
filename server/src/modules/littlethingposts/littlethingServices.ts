import { db } from '../../db/index';
import { InferInsertModel } from 'drizzle-orm';
import { littlethings } from '../../db/schema';
import { InternalError } from '../../errors';

const createLittleThings = async (
  userId: string,
  littleThingsData: InferInsertModel<typeof littlethings>
) => {
  const littlethingPost = await db
    .insert(littlethings)
    .values({ ...littleThingsData, user_id: userId })
    .returning();

  console.log('littlethingPost', littlethingPost[0]);

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

export { createLittleThings, getLittleThingPosts };
