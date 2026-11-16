const express = require("express");
const router = express.Router();
const ReservaController = require("../controllers/reservaController");
const authMiddleware = require("../middlewares/authMiddleware"); // 1. Importar

// 2. Aplicar o middleware em todas as rotas de reservas abaixo dele
router.use(authMiddleware);

router.get("/", ReservaController.listarTodas);
router.get("/:id", ReservaController.buscarPorId);
router.post("/", ReservaController.criar);
router.put("/:id", ReservaController.atualizar);
router.delete("/:id", ReservaController.deletar);

module.exports = router;
