# Arquitectura del Proyecto TaskFlow

## Visión General
La aplicación TaskFlow está compuesta por tres capas principales:

- Frontend
- Backend
- Base de Datos

## Arquitectura

Frontend (Next.js)
- Consume la API REST
- Renderiza la interfaz de usuario
- Maneja interacción con el usuario

Backend (Express)
- Expone endpoints REST
- Contiene la lógica de negocio
- Se comunica con la base de datos mediante Prisma

Base de Datos
- Almacena tareas
- Gestionada mediante Prisma ORM

## Comunicación
El frontend se comunica con el backend mediante HTTP (JSON).
