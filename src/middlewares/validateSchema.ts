import { RequestHandler } from 'express';
import { eligibilitySchema } from '../utils/validations';

export const validateData: RequestHandler = (req, _res, next) => {
  eligibilitySchema(req.body);
  next();
};
