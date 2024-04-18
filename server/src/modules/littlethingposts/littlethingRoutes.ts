import express from 'express';

const router = express.Router();

router.post('/add/newpost');
router.delete('/delete/posts');

export default router;
