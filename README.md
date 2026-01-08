# TaskFlow App

TaskFlow aplicación web para la gestión básica de tareas.

## Objetivo
Definir la estructura y planificación inicial del proyecto, estableciendo límites claros y tecnologías base.

## Alcance
- CRUD de tareas
- Frontend web
- Backend API REST
- Base de datos relacional

## Tecnologías
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Base de datos: PostgreSQL (Prisma ORM)
- Infraestructura: Vercel / Railway

## 🚀 Despliegue en Producción

### Requisitos
- Docker 20+
- Docker Compose 2+

### Despliegue Local (Simulación de Producción)
```bash
# Ejecutar script de deploy
./deploy-production.sh

# O manualmente:
docker-compose -f docker-compose.prod.yml up --build -d

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# Detener
docker-compose -f docker-compose.prod.yml down
```

### Variables de Entorno

Crear `.env.production`:
```env
DATABASE_URL=postgresql://taskflow:taskflow_secret_123@db:5432/taskflow_prod
JWT_SECRET=super_secret_jwt_key_production
NODE_ENV=production
```

### Health Checks

- Frontend: http://localhost:3000
- API: http://localhost:4000/api/health
- Database: `docker-compose exec db pg_isready`

### Backup de Base de Datos
```bash
docker-compose -f docker-compose.prod.yml exec db pg_dump -U taskflow taskflow_prod > backup.sql
```
