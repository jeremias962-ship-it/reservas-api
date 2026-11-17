# Retrospectiva do Projeto - Reservas API

## Sprint 1 - Fundação, Banco de Dados & CRUD Base

**O que foi bom:**

- Estruturação da arquitetura MVC em Node.js/Express (`src/`).
- Implementação do CRUD completo de reservas (`GET`, `POST`, `PUT`, `DELETE`) integrado ao PostgreSQL no Neon.
- Criação do middleware global de tratamento de erros e documentação inicial no `README.md`.

**O que travou:**

- Desalinhamento inicial de caminhos entre `server.js` e a pasta `src/`, resolvido na organização dos diretórios e scripts.

---

## Sprint 2 - Autenticação JWT & Segurança de Rotas

**O que foi bom:**

- Implementação do cadastro de usuários com hash de senha (`bcryptjs`) e validação de conflito (`409 Conflict`).
- Endpoint de login (`POST /api/auth/login`) gerando Token JWT funcional (`200 OK`).
- Criação do `authMiddleware.js` para proteção das rotas de reservas.

**O que travou:**

- Falha de autenticação com o banco Neon (`password authentication failed`) causada pela tradução automática do navegador quebrando o modal de conexão e ocultando a senha real. Resolvido desativando o tradutor da página, revelando a credencial correta e atualizando o `.env`.

---

## Sprint 3 - Testes Automatizados & Deploy

**O que foi bom:**

- Implementação do Jest e Supertest com testes de integração passando.
- API publicada com sucesso em produção no Render (região Ohio).

**O que travou:**

- O deploy inicial na região de Oregon apresentou um bug de roteamento do Render (erro `no-server`). Foi resolvido recriando o serviço na região de Ohio.

**Próximos passos (Backlog futuro):**

- Adicionar testes de integração para as rotas protegidas do CRUD de reservas.
- Implementar documentação interativa da API com Swagger (OpenAPI).
