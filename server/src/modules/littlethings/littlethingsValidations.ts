import { body, param } from 'express-validator';

const createPostValidation = [
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  body('littlething')
    .notEmpty()
    .withMessage('Little Thing is required')
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  body('frequency')
    .notEmpty()
    .withMessage('Frequency is required')
    .isIn(['Daily', 'Weekly', 'Monthly', 'Yearly'])
    .withMessage(
      'Frequency must be one of the following: Daily, Weekly, Monthly, Yearly'
    ),

  body('occurence')
    .notEmpty()
    .withMessage('Occurrence is required')
    .isInt({ min: 1 })
    .withMessage('Occurrence must be an integer and at least 1'),
];

const deletePostValidation = [
  param('id')
    .notEmpty()
    .withMessage('Littlethings ID is required')
    .isUUID()
    .withMessage('Littlethings ID must be a valid UUID'),
];

export { createPostValidation, deletePostValidation };
