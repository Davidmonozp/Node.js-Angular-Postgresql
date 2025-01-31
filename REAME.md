# CRUD de Usuarios con Angular y Node.js

Este proyecto implementa un CRUD (Crear, Leer, Actualizar y Eliminar) de usuarios utilizando Angular para el frontend y Node.js con Express y PostgreSQL para el backend.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

### Backend

*   Node.js y npm
*   PostgreSQL

### Frontend

*   Angular CLI

## Instalación

### Backend

1.  Clona este repositorio:

    ```bash
    git clone [https://github.com/Davidmonozp/Node.js-Angular-Postgresql.git]  
    cd backend
    ```

2.  Instala las dependencias:

    ```bash
    npm install
    ```

3.  Instala SweetAlert2:

    ```bash
    npm install sweetalert2
    ```

4.  Crea un archivo `.env` en la raíz del directorio `backend` y configura las variables de entorno para la conexión a la base de datos PostgreSQL:

    ```
    USER=postgres
    HOST=localhost
    DATABASE=crud
    PASSWORD=toor
    PORT=5432
    ```

5.  Crea la base de datos `crud` en PostgreSQL y la tabla `usuarios` con la siguiente estructura:

    ```sql
    CREATE TABLE usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        correo VARCHAR(255) UNIQUE NOT NULL,
        edad INTEGER NOT NULL
    );
    ```

### Frontend

1.  Navega al directorio `frontend`:

    ```bash
    cd frontend
    ```

2.  Instala las dependencias:

    ```bash
    npm install
    ```

3.  Instala SweetAlert2:

    ```bash
    npm install sweetalert2
    ```

## Ejecución

### Backend

1.  Inicia el servidor backend:

    ```bash
    node app.js
    ```

    El servidor estará disponible en `http://localhost:3000`.

### Frontend

1.  Inicia el servidor de desarrollo de Angular:

    ```bash
    ng serve
    ```

    La aplicación estará disponible en `http://localhost:4200`.

## Uso

La aplicación permite realizar las siguientes operaciones:

*   **Listar usuarios:** Muestra una lista de todos los usuarios registrados.
*   **Crear usuario:** Permite agregar un nuevo usuario.
*   **Editar usuario:** Permite modificar los datos de un usuario existente.
*   **Eliminar usuario:** Permite eliminar un usuario.

## SweetAlert2

Este proyecto utiliza SweetAlert2 para mostrar alertas y mensajes de confirmación.

### Frontend

Para usar SweetAlert2 en el frontend, importa la librería en el componente donde la necesites:

```typescript
import Swal from 'sweetalert2';