const request = require("supertest");
const app = require("../src/server");

describe("Testes de Autenticação", () => {
  it("Deve retornar erro 401 se tentar acessar reservas sem token", async () => {
    const response = await request(app).get("/api/reservas");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Token não fornecido.");
  });

  it("Deve retornar erro 400 se tentar fazer login sem enviar dados", async () => {
    const response = await request(app).post("/api/auth/login").send({}); // Envia um objeto vazio

    expect(response.status).toBe(400);
  });
});
