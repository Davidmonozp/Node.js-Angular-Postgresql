// api/data/update.js
const pool = require("../pool");

module.exports = async (req, res) => {
  const { id } = req.query;
  const { nombre, correo, edad } = req.body;

  try {
    const result = await pool.query(
      "UPDATE usuarios SET nombre = $1, correo = $2, edad = $3 WHERE id = $4 RETURNING *",
      [nombre, correo, edad, id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar usuario");
  }
};
