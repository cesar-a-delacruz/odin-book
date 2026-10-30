const routes = require("../routes/index.js");
const controller = require("../controllers/index.js").follower;
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

for (const route in routes) {
  app.use(routes[route].router);
}

const findAllByFollower = controller.repository.findAllByFollower;
afterEach(() => {
  controller.repository.findAllByFollower = findAllByFollower;
});

describe("GET follower", () => {
  test("success", async () => {
    const response = await request(app).get(`/${routes.follower.basePath}`);
    expect(response.status).toBe(200);
  });
  test("failure 500", async () => {
    controller.repository.findAllByFollower = jest
      .fn()
      .mockImplementationOnce(() => {
        throw Error;
      });
    const response = await request(app).get(`/${routes.follower.basePath}`);
    expect(response.status).toBe(500);
  });
});
