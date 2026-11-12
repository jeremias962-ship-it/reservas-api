const pool = require("../config/database");

const UserModel = {
  async buscarPorEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async criar({ nome, email, senhaHash }) {
    const query = `
      INSERT INTO users (nome, email, senha) 
      VALUES ($1, $2, $3) 
      RETURNING id, nome, email, criado_em;
    `;
    const result = await pool.query(query, [nome, email, senhaHash]);
    return result.rows[0];
  },
};

module.exports = UserModel;
