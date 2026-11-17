# Reservas API

API RESTful para gerenciamento de reservas desenvolvida com Node.js, Express e PostgreSQL (Neon), equipada com autenticação JWT, validações de regras de negócio, documentação interativa via Swagger e suíte de testes automatizados.

## 🌐 Links em Produção (Render)

* **URL Base da API:** [https://reservas-api-37lj.onrender.com](https://reservas-api-37lj.onrender.com)
* **Documentação Interativa (Swagger UI):** [https://reservas-api-37lj.onrender.com/api-docs](https://reservas-api-37lj.onrender.com/api-docs)

*(Nota: Como a aplicação está hospedada no plano gratuito do Render, a primeira requisição após um período de inatividade pode levar cerca de 30 a 50 segundos devido ao cold start).*

## 🛠️ Tecnologias Utilizadas

* **Back-end:** Node.js & Express
* **Banco de Dados:** PostgreSQL hospedado no Neon (`pg`)
* **Segurança & Autenticação:** JSON Web Token (`jsonwebtoken`), `bcryptjs` e `cors`
* **Documentação:** OpenAPI 3.0 com `swagger-ui-express`
* **Testes Automatizados:** Jest & Supertest

## 📋 Funcionalidades e Regras de Negócio

* **Autenticação:** Cadastro (`/api/auth/register`) e login (`/api/auth/login`) com emissão de Token JWT.
* **CRUD Completo de Reservas:** Criação, listagem, busca por ID, atualização e remoção (`/api/reservas`), todas protegidas por middleware de autenticação.
* **Integridade de Dados:** Bloqueio automático (`400 Bad Request`) para tentativas de agendamento em datas passadas, número de pessoas inválido (`<= 0`) ou campos obrigatórios ausentes.

## 🚀 Como Executar Localmente

1. **Instale as dependências:** `npm install`
2. **Configure o `.env`:** adicione `PORT=3000`, `DATABASE_URL` e `JWT_SECRET`
3. **Inicie o servidor:** `npm run dev` (acesse `http://localhost:3000/api-docs`)

## 🧪 Testes Automatizados

Execute `npm test` para rodar a suíte completa de integração.
