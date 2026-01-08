#!/bin/bash

set -e

echo "🚀 Iniciando despliegue a producción local..."

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado"
    exit 1
fi

# Detener servicios existentes
echo "🛑 Deteniendo servicios..."
docker-compose -f docker-compose.prod.yml down

# Limpiar imágenes antiguas
echo "🧹 Limpiando imágenes antiguas..."
docker image prune -f

# Construir imágenes
echo "🏗️ Construyendo imágenes..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Iniciar servicios
echo "▶️ Iniciando servicios..."
docker-compose -f docker-compose.prod.yml up -d

# Esperar a que inicien
echo "⏳ Esperando 30 segundos..."
sleep 30

# Ejecutar migraciones
echo "🗄️ Ejecutando migraciones..."
docker-compose -f docker-compose.prod.yml exec -T api npx prisma migrate deploy

# Verificar salud
echo "🔍 Verificando servicios..."
if curl -f http://localhost:4000/api/health; then
    echo "✅ Backend funcionando"
else
    echo "❌ Backend no responde"
fi

if curl -f http://localhost:3000; then
    echo "✅ Frontend funcionando"
else
    echo "❌ Frontend no responde"
fi

echo ""
echo "✅ Despliegue completado!"
echo "🌐 Frontend: http://localhost:3000"
echo "📡 API: http://localhost:4000"
echo ""
echo "Ver logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "Detener: docker-compose -f docker-compose.prod.yml down"