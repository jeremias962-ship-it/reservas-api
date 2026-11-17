const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Reservas API",
    version: "1.0.0",
    description:
      "API RESTful para gerenciamento de reservas com autenticação JWT e PostgreSQL (Neon).",
  },
  servers: [
    {
      url: "https://reservas-api-37lj.onrender.com",
      description: "Servidor de Produção (Render)",
    },
    {
      url: "http://localhost:3000",
      description: "Servidor Local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      UsuarioAuth: {
        type: "object",
        required: ["email", "senha"],
        properties: {
          nome: {
            type: "string",
            example: "Jeremias Silva",
          },
          email: {
            type: "string",
            format: "email",
            example: "jeremias@teste.com",
          },
          senha: {
            type: "string",
            format: "password",
            example: "senha123",
          },
        },
      },
      ReservaInput: {
        type: "object",
        required: [
          "nome_cliente",
          "data_reserva",
          "hora_reserva",
          "numero_pessoas",
        ],
        properties: {
          nome_cliente: {
            type: "string",
            example: "Carlos Andrade",
          },
          data_reserva: {
            type: "string",
            format: "date",
            example: "2026-12-25",
          },
          hora_reserva: {
            type: "string",
            example: "20:00",
          },
          numero_pessoas: {
            type: "integer",
            example: 4,
          },
        },
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Autenticação"],
        summary: "Cadastrar um novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsuarioAuth" },
            },
          },
        },
        responses: {
          201: { description: "Usuário cadastrado com sucesso" },
          400: { description: "Dados obrigatórios ausentes" },
          409: { description: "E-mail já cadastrado" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Autenticação"],
        summary: "Realizar login e obter Token JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "senha"],
                properties: {
                  email: { type: "string", example: "jeremias@teste.com" },
                  senha: { type: "string", example: "senha123" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Login realizado com sucesso (retorna o Token JWT)" },
          400: { description: "E-mail ou senha não informados" },
          401: { description: "Credenciais inválidas" },
        },
      },
    },
    "/api/reservas": {
      get: {
        tags: ["Reservas"],
        summary: "Listar todas as reservas",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de reservas retornada com sucesso" },
          401: { description: "Token não fornecido ou inválido" },
        },
      },
      post: {
        tags: ["Reservas"],
        summary: "Criar uma nova reserva",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ReservaInput" },
            },
          },
        },
        responses: {
          201: { description: "Reserva criada com sucesso" },
          400: { description: "Campos obrigatórios ausentes ou inválidos" },
          401: { description: "Não autorizado" },
        },
      },
    },
    "/api/reservas/{id}": {
      get: {
        tags: ["Reservas"],
        summary: "Buscar reserva por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Reserva encontrada" },
          404: { description: "Reserva não encontrada" },
        },
      },
      put: {
        tags: ["Reservas"],
        summary: "Atualizar uma reserva existente",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ReservaInput" },
            },
          },
        },
        responses: {
          200: { description: "Reserva atualizada com sucesso" },
          400: { description: "Dados inválidos" },
          404: { description: "Reserva não encontrada" },
        },
      },
      delete: {
        tags: ["Reservas"],
        summary: "Deletar uma reserva",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Reserva deletada com sucesso" },
          404: { description: "Reserva não encontrada" },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
