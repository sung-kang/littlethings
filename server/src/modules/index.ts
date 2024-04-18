import express from 'express';
import authRoutes from './auth/authRoutes';
import userRoutes from './user/userRoutes';
import littlthingRoutes from './littlethingposts/littlethingRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/littlethings', littlthingRoutes);

export default router;
