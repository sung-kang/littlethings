import { Request, Response } from 'express';
import tryCatch from '../../utils/tryCatch';
import {
  createLittleThings,
  getAllLittleThingsByUserId,
  deleteLittleThingsById,
} from './littlethingsServices';

const createPost = tryCatch(async (req: Request, res: Response) => {
  const newPost = await createLittleThings(req.session.userId!, req.body);

  res.status(201).json({ message: newPost });
});

const getAllPosts = tryCatch(async (req: Request, res: Response) => {
  const postData = await getAllLittleThingsByUserId(req.session.userId!);

  res.status(200).json({ message: postData });
});

const deletePost = tryCatch(async (req: Request, res: Response) => {
  const deletedPostId = await deleteLittleThingsById(
    req.session.userId!,
    req.params.id
  );

  res.status(200).json({ message: deletedPostId });
});

export { createPost, getAllPosts, deletePost };
