import {body} from 'express-validator';

export const registerValidation = [
  body('email', 'Invalid mail format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({min:5}),
  body('fullName', 'Enter a valid name').isLength({min:3}),
  body('avatarUrl', 'Enter a valid link').optional().isURL(),
];