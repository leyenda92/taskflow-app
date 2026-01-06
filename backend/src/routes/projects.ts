import express from 'express';
import { prisma } from '../config/database';

const router = express.Router();

router.post('/', async (req, res) => {
  const project = await prisma.project.create({
    data: { name: req.body.name, userId: (req as any).user.id }
  });
  res.json(project);
});

router.get('/', async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { userId: (req as any).user.id }
  });
  res.json(projects);
});

export default router;