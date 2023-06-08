import {body} from 'express-validator';

export const loginValidation = [
  body('email', 'Invalid mail format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({min:5}),
];

export const registerValidation = [
  body('email', 'Invalid mail format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({min:5}),
  body('fullName', 'Enter a valid name').isLength({min:3}),
  body('avatarUrl', 'Enter a valid link').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Invalid title').isLength({min:3}).isString(),
  body('text', 'Enter the text').isLength({min:10}).isString(),
  body('tags', 'Invalid tag format').optional().isString(),
  body('imageUrl', 'Invalid link').optional().isString(),
];