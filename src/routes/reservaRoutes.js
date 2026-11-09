const express = require("express");
const router = express.Router();
const ReservaController = require("../controllers/reservaController");

// Listar todas as reservas (GET)
router.get("/reservas", ReservaController.listar);

// Buscar reserva por ID (GET)
router.get("/reservas/:id", ReservaController.buscarPorId);

// Criar uma nova reserva (POST)
router.post("/reservas", ReservaController.criar);

// Atualizar uma reserva (PUT)
router.put("/reservas/:id", ReservaController.atualizar);

// Deletar uma reserva (DELETE)
router.delete("/reservas/:id", ReservaController.deletar);

module.exports = router;
