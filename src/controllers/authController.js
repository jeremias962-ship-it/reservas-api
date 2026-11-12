const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");

const AuthController = {
  async registrar(req, res, next) {
    try {
      const { nome, email, senha } = req.body;

      // Validação básica de campos obrigatórios
      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ error: "Nome, email e senha são obrigatórios." });
      }

      // Verificar se o email já está cadastrado
      const usuarioExistente = await UserModel.buscarPorEmail(email);
      if (usuarioExistente) {
        return res
          .status(409)
          .json({ error: "Este e-mail já está cadastrado." });
      }

      // Gerar o hash da senha (custo de 10 rodadas)
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);

      // Criar o utilizador no banco de dados
      const novoUsuario = await UserModel.criar({
        nome,
        email,
        senhaHash,
      });

      return res.status(201).json({
        message: "Utilizador cadastrado com sucesso!",
        usuario: novoUsuario,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthController;
