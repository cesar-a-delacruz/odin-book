const routes = require("../../routes/index.js");
const controller = require("../../controllers/index.js").post;
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

for (const route in routes) {
  app.use(routes[route].router);
}

const create = controller.repository.create;

describe("POST post/", () => {
  const post = {
    content: "fake content",
  };
  afterEach(() => {
    controller.repository.create = create;
  });
  test("success required fields", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => post);
    const response = await request(app)
      .post(`/${routes.post.basePath}`)
      .send(post);
    expect(response.status).toBe(201);
  });

  // content validation
  test("failure 422 content empty", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => post);
    const { content, ...testUser } = post;
    const response = await request(app)
      .post(`/${routes.post.basePath}`)
      .send({ ...testUser });
    expect(response.status).toBe(422);
  });
  test("failure 422 content length min", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => post);
    const response = await request(app)
      .post(`/${routes.post.basePath}`)
      .send({ ...post, content: "f" });
    expect(response.status).toBe(422);
  });
  test("failure 422 content length max", async () => {
    controller.repository.create = jest.fn().mockImplementationOnce(() => post);
    for (let i = 0; i < 189; i++) {
      post.content = post.content.concat("t");
    }
    const response = await request(app)
      .post(`/${routes.post.basePath}`)
      .send(post);
    expect(response.status).toBe(422);
  });
});
