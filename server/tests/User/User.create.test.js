const routes = require("../../routes/index.js");
const controller = require("../../controllers/index.js").user;
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

for (const route in routes) {
  app.use(routes[route].router);
}

const create = controller.repository.create;

describe("POST user/", () => {
  const user = {
    username: "fakeuser00",
    fullname: "fakeuser00",
    password: "fakeuser00",
  };
  afterEach(() => {
    controller.repository.create = create;
  });
  test("success required fields", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send(user);
    expect(response.status).toBe(201);
  });
  test("success optional fields", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    user.bio = "0";
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send(user);
    expect(response.status).toBe(201);
  });

  // username validation
  test("failure 422 username length empty", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    const { username, ...testUser } = user;
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send({ ...testUser });
    expect(response.status).toBe(422);
  });
  test("failure 422 username length min", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send({ ...user, username: "fake" });
    expect(response.status).toBe(422);
  });
  test("failure 422 username length max", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    for (let i = 0; i < 11; i++) {
      user.username = user.username.concat("0");
    }
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send(user);
    expect(response.status).toBe(422);
  });

  // fullname validation
  test("failure 422 fullname length empty", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    const { fullname, ...testUser } = user;
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send({ ...testUser });
    expect(response.status).toBe(422);
  });
  test("failure 422 fullname length min", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send({ ...user, fullname: "fake" });
    expect(response.status).toBe(422);
  });
  test("failure 422 fullname length max", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    for (let i = 0; i < 31; i++) {
      user.fullname = user.fullname.concat("0");
    }
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send(user);
    expect(response.status).toBe(422);
  });

  // password validation
  test("failure 422 password length empty", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    const { password, ...testUser } = user;
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send({ ...testUser });
    expect(response.status).toBe(422);
  });
  test("failure 422 password length min", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send({ ...user, password: "fakeuse" });
    expect(response.status).toBe(422);
  });
  test("failure 422 password length max", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    for (let i = 0; i < 51; i++) {
      user.password = user.password.concat("0");
    }
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send(user);
    expect(response.status).toBe(422);
  });

  // bio validation
  test("failure 422 bio length min", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send({ ...user, bio: "" });
    expect(response.status).toBe(422);
  });
  test("failure 422 bio length max", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => user);
    user.bio = "0";
    for (let i = 0; i < 100; i++) {
      user.bio = user.bio.concat("0");
    }
    const response = await request(app)
      .post(`/${routes.user.basePath}`)
      .send(user);
    expect(response.status).toBe(422);
  });
});
