import { Request, Response } from 'express';
import tryCatch from '../../utils/tryCatch';
import { createLittleThings, getLittleThingPosts } from './littlethingServices';

const createPost = tryCatch(async (req: Request, res: Response) => {
  const newPost = await createLittleThings(req.session.userId!, req.body);

  res.status(201).json({ newPost });
});

const getAllPosts = tryCatch(async (req: Request, res: Response) => {
  const postData = await getLittleThingPosts(req.session.userId!);

  res.status(201).json({ postData });
});

export { createPost, getAllPosts };
