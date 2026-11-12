const express = require("express");
const cors = require("cors");
require("dotenv").config();

const reservaRoutes = require("./routes/reservaRoutes");
const errorHandler = require("./middlewares/errorHandler"); // 1. Importe aqui
const authRoutes = require("./routes/authRoutes"); // 1. Importar

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api/reservas", reservaRoutes);
// ... logo abaixo das outras rotas existentes:
app.use("/api/auth", authRoutes); // 2. Registar

// 2. Registre o middleware global DEPOIS de todas as rotas
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
