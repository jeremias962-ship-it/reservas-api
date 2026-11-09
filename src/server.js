const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const reservaRoutes = require("./routes/reservaRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota de teste (health check)
app.get("/api/health", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({
      status: "online",
      message: "Reservas API running smoothly!",
      database_time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection error" });
  }
});

// Registar as rotas da aplicação
app.use("/api", reservaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
