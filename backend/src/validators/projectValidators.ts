import { Request, Response, NextFunction } from 'express';

export const validateCreateProject = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  next();
};

export const validateUpdateProject = validateCreateProject;
