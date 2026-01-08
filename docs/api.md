# API TaskFlow

## Base URL
/api

Endpoints
Obtener tareas
Método: GET

Ruta: /tasks

Descripción: Retorna todas las tareas

Crear tarea
Método: POST

Ruta: /tasks

Body:

json
Copiar código
{
  "title": "string",
  "description": "string"
}
Actualizar tarea
Método: PUT

Ruta: /tasks/:id

Body:

json
Copiar código
{
  "title": "string",
  "description": "string",
  "completed": boolean
}
Eliminar tarea
Método: DELETE

Ruta: /tasks/:id