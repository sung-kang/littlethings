import { body } from 'express-validator';

const loginValidation = [
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
];

export { loginValidation };
