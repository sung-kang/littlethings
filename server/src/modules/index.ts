import express from 'express';
import authRoutes from './auth/authRoutes';
import userRoutes from './user/userRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
