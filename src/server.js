const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Se o banco estiver em src/config/database.js:
const pool = require("./config/database");

// Se as rotas estiverem em src/routes/:
const authRoutes = require("./routes/authRoutes");
const reservaRoutes = require("./routes/reservaRoutes");

// Se os middlewares estiverem em src/middlewares/:
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/reservas", reservaRoutes);

// Middleware global de erro
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
