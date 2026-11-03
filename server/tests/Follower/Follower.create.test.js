const routes = require("../../routes/index.js");
const controller = require("../../controllers/index.js").follower;
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

for (const route in routes) {
  app.use(routes[route].router);
}

const create = controller.repository.create;

describe("POST follower/", () => {
  afterEach(() => {
    controller.repository.create = create;
  });
  test("success", async () => {
    const users = (await request(app).get("/user")).body.data;
    const follower = {
      followedId: users[1].id,
    };

    controller.repository.create = jest
      .fn()
      .mockImplementationOnce(() => follower);
    const response = await request(app)
      .post(`/${routes.follower.basePath}`)
      .send(follower);
    expect(response.status).toBe(201);
  });
  test("failure 422 followedId empty", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => {});
    const response = await request(app)
      .post(`/${routes.comment.basePath}`)
      .send();
    expect(response.status).toBe(422);
  });
});
