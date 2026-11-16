const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const AuthController = {
  async registrar(req, res, next) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ error: "Nome, email e senha são obrigatórios." });
      }

      const usuarioExistente = await UserModel.buscarPorEmail(email);
      if (usuarioExistente) {
        return res
          .status(409)
          .json({ error: "Este e-mail já está cadastrado." });
      }

      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);

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

  async login(req, res, next) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ error: "Email e senha são obrigatórios." });
      }

      // 1. Buscar o usuário pelo email
      const usuario = await UserModel.buscarPorEmail(email);
      if (!usuario) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      // 2. Comparar a senha enviada com o hash salvo no banco
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      // 3. Gerar o Token JWT (válido por 1 dia)
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthController;
