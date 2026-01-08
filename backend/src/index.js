import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import { authMiddleware } from './middleware/auth';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
var app = express();
app.use(helmet());
app.use(cors({
    origin: true,
    credentials: true,
}));
// Rate limiting
var limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use('/api/', limiter);
app.use(express.json());
// Health check
app.get('/api/health', function (req, res) {
    res.json({ status: 'ok' });
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);
// Error handling
app.use(notFoundHandler);
app.use(errorHandler);
if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, function () {
        console.log('Backend ejecutandose en puerto 3000');
    });
}
export default app;
//# sourceMappingURL=index.js.map