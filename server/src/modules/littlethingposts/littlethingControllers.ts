import { Request, Response } from 'express';
import tryCatch from '../../utils/tryCatch';
import {
  createLittleThings,
  getLittleThingPosts,
  deleteLittleThingPost,
} from './littlethingServices';

const createPost = tryCatch(async (req: Request, res: Response) => {
  const newPost = await createLittleThings(req.session.userId!, req.body);

  res.status(201).json({ newPost });
});

const getAllPosts = tryCatch(async (req: Request, res: Response) => {
  const postData = await getLittleThingPosts(req.session.userId!);

  res.status(201).json({ postData });
});

const deletePost = tryCatch(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const deletedPost = await deleteLittleThingPost(req.session.userId!, postId);

  res.status(201).json({ message: 'post successfully deleted', deletedPost });
});

export { createPost, getAllPosts, deletePost };
