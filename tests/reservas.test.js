require("dotenv").config({ path: ".env" });
const request = require("supertest");
const app = require("../src/server");

describe("Testes de Integração - CRUD de Reservas", () => {
  let token;
  let reservaId;

  // Antes de rodar os testes, faz login para obter um Token JWT válido
  beforeAll(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "jeremias@teste.com",
        senha: "senha123",
      });

    token = res.body.token;
  });

  it("Deve retornar 400 ao tentar criar reserva sem campos obrigatórios", async () => {
    const res = await request(app)
      .post("/api/reservas")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome_cliente: "Cliente Incompleto" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Todos os campos são obrigatórios.");
  });

  it("Deve criar uma nova reserva com sucesso (201)", async () => {
    const res = await request(app)
      .post("/api/reservas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome_cliente: "Teste Automatizado Jest",
        data_reserva: "2026-12-25",
        hora_reserva: "20:00",
        numero_pessoas: 4,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.nome_cliente).toBe("Teste Automatizado Jest");

    reservaId = res.body.id;
  });

  it("Deve listar todas as reservas autenticadas (200)", async () => {
    const res = await request(app)
      .get("/api/reservas")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve buscar a reserva criada pelo ID (200)", async () => {
    const res = await request(app)
      .get(`/api/reservas/${reservaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(reservaId);
  });

  it("Deve atualizar a reserva existente (200)", async () => {
    const res = await request(app)
      .put(`/api/reservas/${reservaId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome_cliente: "Teste Atualizado Jest",
        data_reserva: "2026-12-26",
        hora_reserva: "21:30",
        numero_pessoas: 6,
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Reserva atualizada com sucesso!");
    expect(res.body.reserva.numero_pessoas).toBe(6);
  });

  it("Deve deletar a reserva de teste e limpar o banco (200)", async () => {
    const res = await request(app)
      .delete(`/api/reservas/${reservaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Reserva deletada com sucesso!");
  });

  it("Deve retornar 404 ao buscar reserva já deletada", async () => {
    const res = await request(app)
      .get(`/api/reservas/${reservaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});
