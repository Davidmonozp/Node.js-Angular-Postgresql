// api/data.js
const pool = require("./pool");

module.exports = async (req, res) => {
    const { nombre, correo, edad } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO usuarios (nombre, correo, edad) VALUES ($1, $2, $3) RETURNING *",
        [nombre, correo, edad]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al insertar usuario");
    }
  };
  