const routes = require("../routes/index.js");
const controller = require("../controllers/index.js").post;
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

for (const route in routes) {
  app.use(routes[route].router);
}

const findAll = controller.repository.findAll;
const findAllByUser = controller.repository.findAllByUser;
afterEach(() => {
  controller.repository.findAll = findAll;
  controller.repository.findAllByUser = findAllByUser;
});

describe("GET post", () => {
  test("success", async () => {
    const response = await request(app).get(`/${routes.post.basePath}`);
    expect(response.status).toBe(200);
  });
  test("failure 500", async () => {
    controller.repository.findAll = jest.fn().mockImplementationOnce(() => {
      throw Error;
    });
    const response = await request(app).get(`/${routes.post.basePath}`);
    expect(response.status).toBe(500);
  });
});

describe("GET post/user/:username", () => {
  test("success", async () => {
    const user = (await request(app).get("/user")).body.data[0];

    const response = await request(app).get(
      `/${routes.post.basePath}/user/${user.username}`,
    );
    expect(response.status).toBe(200);
  });
  test("failure 500", async () => {
    const user = (await request(app).get("/user")).body.data[0];
    controller.repository.findAllByUser = jest
      .fn()
      .mockImplementationOnce(() => {
        throw Error;
      });
    const response = await request(app).get(
      `/${routes.post.basePath}/user/${user.username}`,
    );
    expect(response.status).toBe(500);
  });
});

describe("GET post/:id", () => {
  test("success", async () => {
    const post = (await request(app).get("/post")).body.data[0];
    const response = await request(app).get(
      `/${routes.post.basePath}/${post.id}`,
    );
    expect(response.status).toBe(200);
  });
  test("failure 404", async () => {
    const response = await request(app).get(`/${routes.post.basePath}/prtet`);
    expect(response.status).toBe(404);
  });
});
