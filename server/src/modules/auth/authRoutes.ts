import express from 'express';
import validate from '../../utils/validate';
import { loginUser, logoutUser } from './authController';
import { loginValidation } from './authValidation';

const router = express.Router();

/**
 * Route:         POST /api/v1/auth/login
 * Description:   Log in the user
 * Access:        Public
 */
router.post('/login', validate(loginValidation), loginUser);

/**
 * Route:         POST /api/v1/auth/logout
 * Description:   Log out the user
 * Access:        Public
 */
router.post('/logout', logoutUser);

export default router;
