// api/data/delete.js
const pool = require("../pool");

module.exports = async (req, res) => {
  const { id } = req.query;

  try {
    const result = await pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length > 0) {
      res.status(204).send("Usuario eliminado");
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar usuario");
  }
};
