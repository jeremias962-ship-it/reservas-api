const errorHandler = (err, req, res, next) => {
  console.error(
    "❌ Erro capturado pelo Middleware Global:",
    err.stack || err.message,
  );

  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno no servidor.";

  res.status(statusCode).json({
    error: true,
    message: message,
  });
};

module.exports = errorHandler;
