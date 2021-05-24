jest.useFakeTimers();
import supertest from "supertest";
import { server } from "../server/index";
import User from "../server/models/User";
import Family from "../server/models/Family";
import mongoose from "mongoose";

import { createUser, loginUser, createFamily, changeFamily } from "./helpers";

const api = supertest(server);

let user1: any, user2: any;
let token1: any, token2: any, family: any;

beforeAll(async () => {
  await User.deleteMany({});
  await Family.deleteMany({});

  user1 = (await createUser(api, "test1", "test", "test1")).body;
  user2 = (await createUser(api, "test2", "test", "test2")).body;
  token1 = (await loginUser(api, "test1", "test")).res.body.token;
  token2 = (await loginUser(api, "test2", "test")).res.body.token;
});

describe("Family / ENDPOINT", () => {
  it("GET / request", async () => {
    const res = await api.get("/api/family").trustLocalhost();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("POST / request correct", async () => {
    const res = await createFamily(api, token1, {
      name: "Test Family",
      funds: 1000,
    });
    family = res.body;
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("funds");
    expect(res.body).toHaveProperty("members");
    expect(res.body).toHaveProperty("createdBy");
    expect(res.body.createdBy).toEqual(user1.id);
    expect(res.body.members[0]).toEqual(user1.id);
  });

  it("Check if added", async () => {
    const res = await api.get("/api/family").trustLocalhost();
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(1);
  });

  it("POST / request missing token", async () => {
    const res = await createFamily(api, "", {
      name: "Test Family",
      funds: 1000,
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toEqual("Unauthorized");
  });

  it("POST / request missing name", async () => {
    const res = await createFamily(api, token2, {
      funds: 1000,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("POST / request missing funds", async () => {
    const res = await createFamily(api, token2, {
      name: "Tes",
    });

    expect(res.status).toBe(200);
    expect(res.body.funds).toEqual(0);
  });
});

describe("Family /:id ENDPOINT", () => {
  it("GET request correct", async () => {
    const res = await api.get(`/api/family/${family.id}`).trustLocalhost();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
  });

  it("GET request incorrect", async () => {
    const res = await api.get(`/api/family/sadsad`).trustLocalhost();
    expect(res.status).toBe(400);
    expect(res.body.error).toEqual("Family not found");
  });

  it("PATCH change name incorrectly", async () => {
    const res = await changeFamily(api, token2, family.id, {
      action: "CHAGE_NANME",
      name: "Changed Name",
    });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe("Forbidden");
  });

  it("PATCH change name correctly", async () => {
    const res = await changeFamily(api, token1, family.id, {
      action: "CHANGE_NAME",
      name: "Changed Name",
    });

    expect(res.status).toBe(200);
    expect(res.body.name).toEqual("Changed Name");
    expect(res.body.name).not.toEqual(family.name);
  });

  it("PATCH add member incorrectly", async () => {
    const res = await changeFamily(api, token2, family.id, {
      action: "ADD_MEMBER",
      member: user1.id,
    });

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("error");
  });

  it("PATCH add member correctly", async () => {
    const res = await changeFamily(api, token1, family.id, {
      action: "ADD_MEMBER",
      member: user2.id,
    });

    expect(res.status).toBe(200);
    expect(res.body.members[0]).toEqual(user2.id);
  });

  it("PATCH remove member incorrectly", async () => {
    const res = await changeFamily(api, token2, family.id, {
      action: "REMOVE_MEMBER",
      member: user1.id,
    });

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("error");
  });

  it("PATCH remove member correctly", async () => {
    const res = await changeFamily(api, token1, family.id, {
      action: "REMOVE_MEMBER",
      member: user2.id,
    });

    expect(res.status).toBe(200);
    expect(res.body.members[0]).toEqual(user1.id);
    expect(res.body.members.length).toEqual(1);
  });

  it("PATCH remove fund incorrectly", async () => {
    const res = await changeFamily(api, token2, family.id, {
      action: "REMOVE_FUNDS",
      funds: 500,
    });

    expect(res.status).toBe(403);
    expect(res.body.error).toEqual("Forbidden");
  });

  it("PATCH remove fund incorrectly - insufficient", async () => {
    const res = await changeFamily(api, token1, family.id, {
      action: "REMOVE_FUNDS",
      funds: 1500,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual("Not sufficient funds");
  });

  it("PATCH remove funds correctly", async () => {
    const res = await changeFamily(api, token1, family.id, {
      action: "REMOVE_FUNDS",
      funds: 500,
    });
   
    expect(res.status).toBe(200);
    expect(res.body.funds).toEqual(500);
    expect(res.body.fundsHistory[0]).toEqual({
      _id: res.body.fundsHistory[0]._id,
      action_name: "remove_funds",
      member: user1.id,
      funds: 500,
    });
  });

  it("PATCH add funds incorrectly", async () => {
    const res = await changeFamily(api, token1, family.id, {
      action: "ADD_FUNDS",
      funds: 500,
    });

    expect(res.status).toBe(403);
    expect(res.body.error).toEqual("Forbidden");
  });

  it("PATCH add funds correctly", async () => {
    const admin = (await createUser(api, "admin", "admin", "admin", "Admin"))
      .body;
    const token = (await loginUser(api, "admin", "admin")).res.body.token;
    const res = await changeFamily(api, token, family.id, {
      action: "ADD_FUNDS",
      funds: 500,
    });

    expect(res.status).toBe(200);
    expect(res.body.funds).toEqual(1000);
    expect(res.body.fundsHistory[0]).toEqual({
      _id: res.body.fundsHistory[0]._id,
      action_name: "add",
      member: admin.id,
      funds: 500,
    });
  });

  it("DELETE family incorrectly", async () => {
    const res = await api
      .delete(`/api/family/${family.id}`)
      .set("Authorization", `Bearer ${token2}`)
      .trustLocalhost();

    expect(res.status).toBe(403);
    expect(res.body.error).toEqual("Forbidden");
  });

  it("DELETE family correctly", async () => {
    const res = await api
      .delete(`/api/family/${family.id}`)
      .set("Authorization", `Bearer ${token1}`)
      .trustLocalhost();

    expect(res.status).toBe(200);
    expect(res.body).toEqual("deleted");
  });

  it("Check if deleted", async () => {
    const res = await api.get("/api/family").trustLocalhost();

    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(1);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  server.close(done);
});
