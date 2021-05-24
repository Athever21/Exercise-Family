jest.useFakeTimers();
import supertest from "supertest";
import { server } from "../server/index";
import User from "../server/models/User";
import mongoose from "mongoose";

import { createUser, loginUser, changeUser } from "./helpers";

const api = supertest(server);

describe("User / ENDPOINT", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  it("GET / request", async () => {
    const res = await api.get("/api/users").trustLocalhost();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("POST / correct request", async () => {
    const res = await createUser(api, "user", "password", "name");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("username");
    expect(res.body).toHaveProperty("name");
    expect(res.body).not.toHaveProperty("password");
  });

  it("POST / missing property", async () => {
    const res = await createUser(api, "user", "password");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body).not.toHaveProperty("username");
    expect(res.body).not.toHaveProperty("name");
  });

  it("Check if user insterted properly", async () => {
    const res = await api.get("/api/users").trustLocalhost();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].name).toEqual("name");
    expect(res.body[0].username).toEqual("user");
    expect(res.body[0]).not.toHaveProperty("password");
  });
});

describe("User /:id ENDPOINT", () => {
  let user1: any;
  let token1: any, token2: any;

  beforeAll(async () => {
    await User.deleteMany({});
    const res1 = await createUser(api, "test1", "test", "aaa");
    await createUser(api, "test2", "test", "aaa");
    user1 = res1.body;
    token1 = (await loginUser(api, "test1", "test")).res.body.token;
    token2 = (await loginUser(api, "test2", "test")).res.body.token;
  });

  it("Invalid id", async () => {
    const res = await api.get(`/api/users/aadsa`).trustLocalhost();
    expect(res.status).toBe(400);
    expect(res.body.error).toEqual("User not found");
  });

  it("GET request", async () => {
    const res = await api.get(`/api/users/${user1.id}`).trustLocalhost();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("username");
  });

  it("PATCH correct request", async () => {
    const res = await changeUser(api, user1.id, token1, {
      username: "test",
      password: "password",
      name: "test",
    });
    expect(res.status).toBe(200);
    expect(res.body.username).not.toEqual(user1.username);
    expect(res.body.username).toEqual("test");
    expect(res.body.name).not.toEqual(user1.name);
    expect(res.body.name).toEqual("test");
  });

  it("Patch invalid token", async () => {
    const res = await changeUser(api, user1.id, token2, {
      username: "test",
      password: "password",
      name: "test",
    });
    expect(res.status).toBe(403);
    expect(res.body.error).toEqual("Forbidden");
    expect(res.body.name).not.toEqual(user1.name);
  });

  it("Delete incorrectly", async () => {
    const res = await api
      .delete(`/api/users/${user1.id}`)
      .set("Authorization", `Bearer ${token2}`)
      .trustLocalhost();

    expect(res.status).toBe(403);
    expect(res.body.error).toEqual("Forbidden");
  });

  it("Delete correctly", async () => {
    const res = await api
      .delete(`/api/users/${user1.id}`)
      .set("Authorization", `Bearer ${token1}`)
      .trustLocalhost();

    expect(res.status).toBe(200);
    expect(res.body).toEqual("deleted");
  });

  it("Check if user deleted properly", async () => {
    const res = await api.get("/api/users").trustLocalhost();
    expect(res.body.length).toEqual(1);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  server.close(done);
});
