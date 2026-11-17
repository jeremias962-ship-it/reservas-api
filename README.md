# Reservas API

## 🌐 API em Produção

A API está publicada e pode ser acessada em: [https://reservas-api-37lj.onrender.com](https://reservas-api-37lj.onrender.com)

API RESTful para gerenciamento de reservas desenvolvida com Node.js, Express e PostgreSQL (Neon).

## Tecnologias

- Node.js & Express
- PostgreSQL (`pg`)
- JSON Web Token (JWT) para autenticação
- Bcrypt (para hash de senhas)
- Dotenv & CORS

## Como executar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

## Sprint 2 - Auth, Segurança & Error Handler

**O que foi bom:**

- Implementação do JWT e middleware de proteção funcionou perfeitamente.
- A estrutura de pastas ficou muito organizada.

**O que travou:**

- Tivemos dificuldade inicial com a conexão do banco Neon (erro de senha). Foi resolvido ao reiniciar o servidor e ajustar o `.env`.
- O README ficou um pouco incompleto no commit, precisamos revisar na próxima.

**Próximos passos:**

- Iniciar a Sprint 3: Testes automatizados com Jest + Supertest.
