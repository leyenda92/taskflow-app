import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('password123', 10);
  await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'test@test.com',
      password: hashed,
    },
  });
  console.log('Usuario seed creado ✅');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
