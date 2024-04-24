import { body } from 'express-validator';

const changePasswordValidation = [
  body('currentPassword')
    .isLength({ min: 6, max: 255 })
    .withMessage('Password must be between 6 and 255 characters long'),

  body('newPassword')
    .isLength({ min: 6, max: 255 })
    .withMessage('New Password must be between 6 and 255 characters long')
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error('New password cannot be same as current password');
      }

      return true;
    }),

  body('confirmNewPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('New password confirmation does not match new password');
    }

    return true;
  }),
];

const deleteUserValidation = [
  body('password')
    .isLength({ min: 6, max: 255 })
    .withMessage('Password must be between 6 and 255 characters long'),
];

const registerValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 255 })
    .withMessage('First name must be less than 256 characters long'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 255 })
    .withMessage('Last name must be less than 256 characters long'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email must be less than 256 characters long'),

  body('password')
    .isLength({ min: 6, max: 255 })
    .withMessage('Password must be between 6 and 255 characters long'),

  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    return true;
  }),
];

export { changePasswordValidation, deleteUserValidation, registerValidation };
