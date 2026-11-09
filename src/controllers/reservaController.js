const ReservaModel = require("../models/reservaModel");

const ReservaController = {
  // Listar todas as reservas
  listar: async (req, res) => {
    try {
      const reservas = await ReservaModel.buscarTodas();
      return res.json(reservas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar reservas." });
    }
  },

  // Buscar reserva por ID
  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await ReservaModel.buscarPorId(id);

      if (!reserva) {
        return res.status(404).json({ error: "Reserva não encontrada." });
      }

      return res.json(reserva);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar reserva." });
    }
  },

  // Criar nova reserva
  criar: async (req, res) => {
    try {
      const { nome_cliente, data_reserva, hora_reserva, numero_pessoas } =
        req.body;

      if (!nome_cliente || !data_reserva || !hora_reserva || !numero_pessoas) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios." });
      }

      const novaReserva = await ReservaModel.criar({
        nome_cliente,
        data_reserva,
        hora_reserva,
        numero_pessoas,
      });

      return res.status(201).json({
        message: "Reserva criada com sucesso!",
        reserva: novaReserva,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar reserva." });
    }
  },

  // Atualizar reserva
  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome_cliente, data_reserva, hora_reserva, numero_pessoas } =
        req.body;

      if (!nome_cliente || !data_reserva || !hora_reserva || !numero_pessoas) {
        return res
          .status(400)
          .json({
            error: "Todos os campos são obrigatórios para a atualização.",
          });
      }

      const reservaAtualizada = await ReservaModel.atualizar(id, {
        nome_cliente,
        data_reserva,
        hora_reserva,
        numero_pessoas,
      });

      if (!reservaAtualizada) {
        return res
          .status(404)
          .json({ error: "Reserva não encontrada para atualizar." });
      }

      return res.json({
        message: "Reserva atualizada com sucesso!",
        reserva: reservaAtualizada,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar reserva." });
    }
  },

  // Deletar reserva
  deletar: async (req, res) => {
    try {
      const { id } = req.params;
      const reservaDeletada = await ReservaModel.deletar(id);

      if (!reservaDeletada) {
        return res
          .status(404)
          .json({ error: "Reserva não encontrada para deletar." });
      }

      return res.json({
        message: "Reserva deletada com sucesso!",
        reserva: reservaDeletada,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar reserva." });
    }
  },
};

module.exports = ReservaController;
