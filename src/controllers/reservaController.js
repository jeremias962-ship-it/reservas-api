const ReservaModel = require("../models/reservaModel");

function validarDadosReserva({ nome_cliente, data_reserva, hora_reserva, numero_pessoas }) {
  if (!nome_cliente || !data_reserva || !hora_reserva || numero_pessoas === undefined || numero_pessoas === null) {
    return "Todos os campos são obrigatórios.";
  }

  if (Number(numero_pessoas) <= 0 || !Number.isInteger(Number(numero_pessoas))) {
    return "O número de pessoas deve ser um número inteiro maior que zero.";
  }

  const hoje = new Date().toISOString().split("T")[0];
  if (data_reserva < hoje) {
    return "Não é possível agendar uma reserva para uma data no passado.";
  }

  return null;
}

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
      const { nome_cliente, data_reserva, hora_reserva, numero_pessoas } = req.body;

      const erroValidacao = validarDadosReserva({ nome_cliente, data_reserva, hora_reserva, numero_pessoas });
      if (erroValidacao) {
        return res.status(400).json({ error: erroValidacao });
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
      const { nome_cliente, data_reserva, hora_reserva, numero_pessoas } = req.body;

      const erroValidacao = validarDadosReserva({ nome_cliente, data_reserva, hora_reserva, numero_pessoas });
      if (erroValidacao) {
        return res.status(400).json({ error: erroValidacao });
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
