import express from 'express';
import verifyAuthentication from '../../utils/verifyAuthentication';
import { createPost, getAllPosts, deletePost } from './littlethingControllers';

const router = express.Router();

router.use(verifyAuthentication);

/**
 * Route:         POST /api/v1/littlethings/getallposts
 * Description:   creates a new post for the user
 * Access:        Private
 */

router.get('/get/allposts', getAllPosts);

/**
 * Route:         POST /api/v1/littlethings/add/newpost
 * Description:   creates a new post for the user
 * Access:        Private
 */

router.post('/add/newpost', createPost);

/**
 * Route:         POST /api/v1/littlethings/delete/posts
 * Description:   creates a new post for the user
 * Access:        Private
 */

router.delete('/delete/posts/:id', deletePost);

export default router;
