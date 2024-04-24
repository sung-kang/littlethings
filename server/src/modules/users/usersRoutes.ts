import express from 'express';
import validate from '../../utils/validate';
import { changePassword, deleteUser, registerUser } from './usersControllers';
import {
  changePasswordValidation,
  deleteUserValidation,
  registerValidation,
} from './usersValidations';
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

/**
 * Route:         PUT /api/v1/users/change-password
 * Description:   Changes password for authenticated user
 * Access:        Private
 */
router.put(
  '/change-password',
  verifyAuthentication,
  validate(changePasswordValidation),
  changePassword
);

export default router;
