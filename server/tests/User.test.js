const routes = require("../routes/index.js");
const controller = require("../controllers/index.js").user;
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

for (const route in routes) {
  app.use(routes[route].router);
}

const findAll = controller.repository.findAll;
const findOne = controller.repository.findOne;
afterEach(() => {
  controller.repository.findAll = findAll;
  controller.repository.findOne = findOne;
});

describe("GET user", () => {
  test("success", async () => {
    const response = await request(app).get(`/${routes.user.basePath}`);
    expect(response.status).toBe(200);
  });
  test("failure 500", async () => {
    controller.repository.findAll = jest.fn().mockImplementationOnce(() => {
      throw Error;
    });
    const response = await request(app).get(`/${routes.user.basePath}`);
    expect(response.status).toBe(500);
  });
});

describe("GET user/:username", () => {
  test("success", async () => {
    const user = (await request(app).get("/user")).body.data[0];
    const response = await request(app).get(
      `/${routes.user.basePath}/${user.username}`,
    );
    expect(response.status).toBe(200);
  });
  test("failure 404", async () => {
    const response = await request(app).get(`/${routes.user.basePath}/prtet`);
    expect(response.status).toBe(404);
  });
});
