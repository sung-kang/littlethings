import express from 'express';
import validate from '../../utils/validate';
import { authenticateUser, loginUser, logoutUser } from './authControllers';
import { loginValidation } from './authValidations';
import verifyAuthentication from '../../utils/verifyAuthentication';

const router = express.Router();

/**
 * Route:         GET /api/v1/auth/authenticate
 * Description:   Verifies authentication status of the user
 * Access:        Private
 */
router.get('/authenticate', verifyAuthentication, authenticateUser);

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
