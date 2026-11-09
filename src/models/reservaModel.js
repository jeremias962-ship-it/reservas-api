const db = require("../config/database");

const ReservaModel = {
  buscarTodas: async () => {
    const result = await db.query(
      "SELECT * FROM reservas ORDER BY criado_em DESC",
    );
    return result.rows;
  },

  buscarPorId: async (id) => {
    const result = await db.query("SELECT * FROM reservas WHERE id = $1", [id]);
    return result.rows[0];
  },

  criar: async (dados) => {
    const { nome_cliente, data_reserva, hora_reserva, numero_pessoas } = dados;
    const query = `
      INSERT INTO reservas (nome_cliente, data_reserva, hora_reserva, numero_pessoas)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [nome_cliente, data_reserva, hora_reserva, numero_pessoas];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  atualizar: async (id, dados) => {
    const { nome_cliente, data_reserva, hora_reserva, numero_pessoas } = dados;
    const query = `
      UPDATE reservas
      SET nome_cliente = $1, data_reserva = $2::date, hora_reserva = $3::time, numero_pessoas = $4
      WHERE id = $5 RETURNING *;
    `;
    const values = [
      nome_cliente,
      data_reserva,
      hora_reserva,
      numero_pessoas,
      id,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  deletar: async (id) => {
    const result = await db.query(
      "DELETE FROM reservas WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows[0];
  },
};

module.exports = ReservaModel;
