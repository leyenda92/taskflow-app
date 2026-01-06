import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import { authMiddleware } from './middleware/auth';
import { prisma } from './config/database';

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('Backend running on port 3000');
  });
}

export default app;