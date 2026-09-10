# Alcance del Sistema de Mensajería

## Decisión

**Alcance aprobado: Las tres funcionalidades**

| Funcionalidad | Descripción | Caso de uso |
|---|---|---|
| **1:1** | Chat privado entre dos usuarios | Alumno pregunta a docente, alumno ↔ alumno |
| **Grupal** | Conversación con múltiples participantes | Grupo de estudio, proyecto, comisión |
| **Avisos por curso** | Mensaje broadcast a todos los miembros de un curso | Anuncios oficiales, tareas, noticias |

## Requisitos que cubre

- Todos los usuarios pueden enviar y recibir mensajes
- Comunicación bidireccional (alumnos pueden preguntar a docentes)
- Notificaciones: in-app + push + email

## Impacto

- **CI-02 (Modelo de datos):** Requiere tablas para usuarios, cursos, conversaciones, participantes, mensajes y notificaciones
- **CI-06 (Selector de destinatario):** Selector de usuarios (1:1), creación de grupos, selector de curso(s) para avisos
