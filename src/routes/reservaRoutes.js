const express = require("express");
const router = express.Router();
const ReservaController = require("../controllers/reservaController");

router.get("/", ReservaController.listarTodas);
router.get("/:id", ReservaController.buscarPorId);
router.post("/", ReservaController.criar);
router.put("/:id", ReservaController.atualizar);
router.delete("/:id", ReservaController.deletar);

module.exports = router;
