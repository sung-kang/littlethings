import express from 'express';
import validate from '../../utils/validate';
import { createPost, getAllPosts, deletePost } from './littlethingsControllers';
import {
  createPostValidation,
  deletePostValidation,
} from './littlethingsValidations';
import verifyAuthentication from '../../utils/verifyAuthentication';

const router = express.Router();

router.use(verifyAuthentication);

/**
 * Route:         GET /api/v1/littlethings/get-all-posts
 * Description:   Retrieves all the posts created by the user
 * Access:        Private
 */
router.get('/get-all-posts', getAllPosts);

/**
 * Route:         POST /api/v1/littlethings/create-post
 * Description:   Creates a new post for the user
 * Access:        Private
 */
router.post('/create-post', validate(createPostValidation), createPost);

/**
 * Route:         DELETE /api/v1/littlethings/:id
 * Description:   Deletes a post created by the user by littlethings (post) ID
 * Access:        Private
 */
router.delete('/:id', validate(deletePostValidation), deletePost);

export default router;
