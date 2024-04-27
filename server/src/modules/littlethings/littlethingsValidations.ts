import { body, param } from 'express-validator';

const createPostValidation = [
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  body('littlething')
    .trim()
    .notEmpty()
    .withMessage('Little Thing is required')
    .isLength({ max: 500 })
    .withMessage('Little Thing must not exceed 500 characters'),

  body('frequency')
    .notEmpty()
    .withMessage('Frequency is required')
    .isIn(['Daily', 'Weekly', 'Monthly', 'Yearly'])
    .withMessage(
      'Frequency must be one of the following: Daily, Weekly, Monthly, Yearly'
    ),

  body('occurrence')
    .notEmpty()
    .withMessage('Occurrence is required')
    .isInt({ min: 1 })
    .withMessage('Occurrence must be an integer and at least 1'),
];

const updatePostValidation = [
  param('id')
    .notEmpty()
    .withMessage('Littlethings ID is required')
    .isUUID()
    .withMessage('Littlethings ID must be a valid UUID'),

  body('description')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),

  body('littlething')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Little Thing must be between 1 and 500 characters'),

  body('frequency')
    .optional()
    .isIn(['Daily', 'Weekly', 'Monthly', 'Yearly'])
    .withMessage(
      'Frequency must be one of the following: Daily, Weekly, Monthly, Yearly'
    ),

  body('occurrence')
    .optional()
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

export { createPostValidation, updatePostValidation, deletePostValidation };
