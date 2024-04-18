import express from 'express';
import validate from '../../utils/validate';
import { registerUser, deleteUser } from './userController';
import { deleteUserValidation, registerValidation } from './userValidation';
import verifyAuthentication from '../../utils/verifyAuthentication';

const router = express.Router();

/**
 * Route:         POST /api/v1/users/register
 * Description:   Registers the user
 * Access:        Public
 */
router.post('/register', validate(registerValidation), registerUser);

/**
 * Route:         DELETE /api/v1/users/delete-user
 * Description:   Deletes authenticated user's account
 * Access:        Private
 */
router.delete(
  '/delete-user',
  verifyAuthentication,
  validate(deleteUserValidation),
  deleteUser
);

export default router;
