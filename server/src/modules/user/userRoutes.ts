import express from 'express';
import validate from '../../utils/validate';
import { registerUser } from './userController';
import { registerValidation } from './userValidation';

const router = express.Router();

/**
 * Route:         POST /api/v1/users/register
 * Description:   Registers the user
 * Access:        Public
 */
router.post('/register', validate(registerValidation), registerUser);

export default router;
