const ReservaModel = require("../models/reservaModel");

const ReservaController = {
  listarTodas: async (req, res, next) => {
    try {
      const reservas = await ReservaModel.buscarTodas();
      res.status(200).json(reservas);
    } catch (error) {
      next(error);
    }
  },

  buscarPorId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const reserva = await ReservaModel.buscarPorId(id);

      if (!reserva) {
        return res.status(404).json({ error: "Reserva não encontrada." });
      }

      res.status(200).json(reserva);
    } catch (error) {
      next(error);
    }
  },

  criar: async (req, res, next) => {
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

      res.status(201).json(novaReserva);
    } catch (error) {
      next(error);
    }
  },

  atualizar: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nome_cliente, data_reserva, hora_reserva, numero_pessoas } =
        req.body;

      if (!nome_cliente || !data_reserva || !hora_reserva || !numero_pessoas) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios." });
      }

      const reservaAtualizada = await ReservaModel.atualizar(id, {
        nome_cliente,
        data_reserva,
        hora_reserva,
        numero_pessoas,
      });

      if (!reservaAtualizada) {
        return res.status(404).json({ error: "Reserva não encontrada." });
      }

      res.status(200).json({
        message: "Reserva atualizada com sucesso!",
        reserva: reservaAtualizada,
      });
    } catch (error) {
      next(error);
    }
  },

  deletar: async (req, res, next) => {
    try {
      const { id } = req.params;
      const reservaDeletada = await ReservaModel.deletar(id);

      if (!reservaDeletada) {
        return res.status(404).json({ error: "Reserva não encontrada." });
      }

      res.status(200).json({
        message: "Reserva deletada com sucesso!",
        reserva: reservaDeletada,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ReservaController;
