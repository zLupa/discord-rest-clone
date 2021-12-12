import request from "supertest";
import { Connection } from "typeorm";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Register User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();

    await connection.close();
  });

  it("should be able to register an user", async () => {
    const user: ICreateUserDTO = {
      username: "test",
      email: "test@test.com",
      password: "test",
    };

    const response = await request(app)
      .post("/api/authenticate/register")
      .send(user);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toEqual(user.email);
  });

  it("should not be able to register an user if email already exists", async () => {
    const user: ICreateUserDTO = {
      username: "test",
      email: "test@test.com",
      password: "test",
    };

    await request(app).post("/authenticate/register").send(user);
    const response = await request(app)
      .post("/api/authenticate/register")
      .send(user);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
  });
});
