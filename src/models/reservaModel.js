const db = require("../config/database");

const ReservaModel = {
  // Buscar todas as reservas
  buscarTodas: async () => {
    const result = await db.query(
      "SELECT * FROM reservas ORDER BY criado_em DESC",
    );
    return result.rows;
  },

  // Criar uma nova reserva
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
};

module.exports = ReservaModel;
