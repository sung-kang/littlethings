import express from 'express';
import authRoutes from './auth/authRoutes';
import usersRoutes from './users/usersRoutes';
import littlthingsRoutes from './littlethings/littlethingsRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/littlethings', littlthingsRoutes);

export default router;
