# Sistema de Gestión de Personas con CQRS y Event Sourcing

## Descripción
Este proyecto es una aplicación NestJS que implementa los patrones CQRS (Command Query Responsibility Segregation) y Event Sourcing. Gestiona datos de personas con persistencia dual en MySQL y MongoDB, permitiendo una separación clara entre operaciones de lectura y escritura.

## Tecnologías Utilizadas

### Framework Principal
- NestJS v10.0.3
- Node.js
- TypeScript

### Patrones de Arquitectura y Diseño
- CQRS (Separación de Responsabilidades entre Comandos y Consultas)
- Event Sourcing (Almacenamiento basado en Eventos)
- Patrón Repositorio
- Patrón Agregado
- Patrón Saga
- Patrón Query
- Patrón Command
- Inyección de Dependencias
- Subscripción a Eventos

### Bases de Datos
- MySQL (Almacén de Eventos y Modelo de Lectura)
- MongoDB (Modelo de Lectura)

### ORM/ODM
- TypeORM (para MySQL)
- Mongoose (para MongoDB)

### Documentación API
- Swagger/OpenAPI (@nestjs/swagger)

### Bibliotecas Adicionales
- RxJS (Extensiones Reactivas)
- UUID (Generación de Identificadores Únicos)
- cli-color (Logging en Consola)

## Requisitos Previos
- Node.js (v14 o superior)
- Servidor MySQL
- Servidor MongoDB
- Docker ( para ejecutar bases de datos)

- Descargar Node.js: [https://nodejs.org/](https://nodejs.org/)

### Docker
1. Instalar Docker y Docker Compose:
   - Windows/Mac: [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Linux: [Docker Engine](https://docs.docker.com/engine/install/)

2. Verificar instalación:

## Instalación

1. Clonar el repositorio:
2. Instalar dependencias:
```bash
npm install
```
3. Configurar variables de entorno:
   Crear un archivo `.env` en la raíz del proyecto o renombrar el archivo `.env.example` a `.env` y configurar las variables necesarias.

4. Iniciar el servidor:
```bash
npm run start
```
5. Ver la documentación de la API:
   La documentación Swagger está disponible en: `http://localhost:3003/documentation`

## Pruebas
Para ejecutar las pruebas, utiliza el siguiente comando:
```bash
npm run test
```
    