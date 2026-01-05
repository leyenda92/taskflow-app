import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';

export const AuthService = {
  async register(data: any) {
    const exists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exists) throw new Error('User already exists');

    const password = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: { ...data, password },
    });

    const token = jwt.sign({ id: user.id }, 'secret');

    return { user, token };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id }, 'secret');

    return { user, token };
  },
};
