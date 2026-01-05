import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

export default app;

// ⬇️ SOLO levantar el server si NO estamos en tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('Backend running on port 3000');
  });
}
