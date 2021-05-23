import supertest from "supertest";
import { server } from "../server/index";
import User from "../server/models/User";
import mongoose from "mongoose";

import { createUser, loginUser } from "./helpers";

const api = supertest(server);

beforeAll(async () => {
  await User.deleteMany({});
  await createUser(api, "user", "pass", "name");
});

describe("Login User", () => {
  it("Correctly login user", async () => {
    const { res } = await loginUser(api, "user", "pass");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body).not.toHaveProperty("error");
  });

  it("Missing arguments login user", async () => {
    const { res } = await loginUser(api, "it");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Missing username or password");

    const res1 = await (await loginUser(api, "", "test")).res;
    expect(res1.status).toBe(400);
    expect(res1.body).toHaveProperty("error");
    expect(res1.body.error).toEqual("Missing username or password");
  });

  it("Invalid arguments login user", async () => {
    const { res } = await loginUser(api, "a", "b");
    expect(res.status).toBe(400);
    expect(res.body.error).toEqual("User not found");
  });
});

describe("Refresh Token", () => {
  it("Correctly refresh token", async () => {
    const { refreshToken } = await loginUser(api, "user", "pass");
    const res = await api
      .post("/api/auth/refresh")
      .set("Cookie", [refreshToken])
      .trustLocalhost();

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
  });

  it("Refresh token without cookie", async () => {
    await loginUser(api, "user", "pass");
    const res = await api.post("/api/auth/refresh").trustLocalhost();

    expect(res.status).toBe(401);
    expect(res.body.error).toEqual("Unauthorized");
  });

  it("Refresh token invalid cookie", async () => {
    const { refreshToken } = await loginUser(api, "user", "pass");
    const res = await api
      .post("/api/auth/refresh")
      .set("Cookie", [refreshToken + "aaa"])
      .trustLocalhost();

    expect(res.status).toBe(403);
    expect(res.body.error).toEqual("Invalid token");
  });
});

describe("Logout", () => {
  it("Loging out with token", async () => {
    const { refreshToken } = await loginUser(api, "user", "pass");
    const res = await api
      .post("/api/auth/logout")
      .set("Cookie", [refreshToken])
      .trustLocalhost();
    const refToken = res.headers["set-cookie"][0].split(";")[0];

    expect(res.status).toBe(200);
    expect(refToken.split("=")[1]).toBe("");
    expect(res.text).toEqual("logged out");
  });
  it("Loging out without token", async () => {
    const res = await api.post("/api/auth/logout").trustLocalhost();
    const refToken = res.headers["set-cookie"][0].split(";")[0];

    expect(res.status).toBe(200);
    expect(refToken.split("=")[1]).toBe("");
    expect(res.text).toEqual("logged out");
  });
});

afterAll((done) => {
  mongoose.connection.close();
  server.close(done);
});
