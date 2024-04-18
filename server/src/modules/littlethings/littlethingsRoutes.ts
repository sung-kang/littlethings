import express from 'express';
import verifyAuthentication from '../../utils/verifyAuthentication';
import { createPost, getAllPosts, deletePost } from './littlethingsControllers';

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
router.post('/create-post', createPost);

/**
 * Route:         DELETE /api/v1/littlethings/:id
 * Description:   Deletes a post created by the user by littlethings (post) ID
 * Access:        Private
 */
router.delete('/:id', deletePost);

export default router;
