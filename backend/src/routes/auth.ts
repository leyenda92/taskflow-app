import express from 'express';
import { AuthService } from '../services/authService';
import { validateRegister, validateLogin } from '../validators/authValidators';

const router = express.Router();

router.post('/register', validateRegister, async (req, res, next) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const result = await AuthService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export default router;