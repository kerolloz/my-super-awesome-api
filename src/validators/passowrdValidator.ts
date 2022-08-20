import Joi from 'joi';

export const PasswordValidator = Joi.string().min(8).max(50);
