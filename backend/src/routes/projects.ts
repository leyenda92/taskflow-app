import express from 'express';
import { prisma } from '../config/database';
import { validateCreateProject, validateUpdateProject } from '../validators/projectValidators';

const router = express.Router();

router.post('/', validateCreateProject, async (req, res, next) => {
  try {
    const project = await prisma.project.create({
      data: { name: req.body.name, userId: (req as any).user.id }
    });
    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: (req as any).user.id }
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateUpdateProject, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    const project = await prisma.project.findFirst({
      where: { id, userId: (req as any).user.id }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: { name: req.body.name }
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    const project = await prisma.project.findFirst({
      where: { id, userId: (req as any).user.id }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await prisma.project.delete({ where: { id } });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;