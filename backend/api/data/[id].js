// api/data/[id].js
const pool = require("../pool");

module.exports = async (req, res) => {
  const { id } = req.query;

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener el usuario");
  }
};
