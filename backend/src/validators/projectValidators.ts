import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const projectSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500).optional(),
});

export const validateCreateProject = (req: Request, res: Response, next: NextFunction) => {
  const { error } = projectSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details?.[0]?.message || 'Validation error' });
  }
  next();
};

export const validateUpdateProject = (req: Request, res: Response, next: NextFunction) => {
  const { error } = projectSchema.validate(req.body, { presence: 'optional' });
  if (error) {
    return res.status(400).json({ error: error.details?.[0]?.message || 'Validation error' });
  }
  next();
};