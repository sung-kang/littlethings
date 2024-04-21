import { Request, Response } from 'express';
import tryCatch from '../../utils/tryCatch';
import {
  createLittleThings,
  getAllLittleThingsByUserId,
  updateLittleThingsPostById,
  deleteLittleThingsById,
} from './littlethingsServices';
import { BadRequestError } from '../../errors';

const getAllPosts = tryCatch(async (req: Request, res: Response) => {
  const postData = await getAllLittleThingsByUserId(req.session.userId!);

  res.status(200).json({ message: postData });
});

const createPost = tryCatch(async (req: Request, res: Response) => {
  const newPost = await createLittleThings(req.session.userId!, req.body);

  res.status(201).json({ message: newPost });
});

const updatePost = tryCatch(async (req: Request, res: Response) => {
  if (!Object.keys(req.body).length) {
    throw new BadRequestError('Must provide at least 1 field to update');
  }

  const updatedData = await updateLittleThingsPostById(
    req.session.userId!,
    req.params.id,
    req.body
  );

  res.status(200).json({ message: updatedData });
});

const deletePost = tryCatch(async (req: Request, res: Response) => {
  const deletedPostId = await deleteLittleThingsById(
    req.session.userId!,
    req.params.id
  );

  res.status(200).json({ message: deletedPostId });
});

export { getAllPosts, createPost, updatePost, deletePost };
