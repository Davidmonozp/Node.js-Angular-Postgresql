const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Importa cors

const app = express();
const port = 3000;

// Configurar la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud',
  password: 'toor',
  port: 5432,
});

// Configuración de CORS

app.use(cors({
  origin: 'http://localhost:4200', 
}));

// Ruta GET para obtener usuarios
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los usuarios');
  }
});

// Ruta POST para insertar usuario
app.post('/api/data', express.json(), async (req, res) => {
  const { nombre, correo, edad } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo, edad) VALUES ($1, $2, $3) RETURNING *',
      [nombre, correo, edad]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al insertar usuario');
  }
});

// Ruta PUT para actualizar usuario
app.put('/api/data/:id', express.json(), async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, edad } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, correo = $2, edad = $3 WHERE id = $4 RETURNING *',
      [nombre, correo, edad, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar usuario');
  }
});

// Ruta DELETE para eliminar usuario
app.delete('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar usuario');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
