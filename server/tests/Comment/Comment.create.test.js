const routes = require("../../routes/index.js");
const controller = require("../../controllers/index.js").comment;
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

for (const route in routes) {
  app.use(routes[route].router);
}

const create = controller.repository.create;

describe("POST comment/", () => {
  const comment = {
    content: "fake content",
  };
  afterEach(() => {
    controller.repository.create = create;
  });
  test("success required fields", async () => {
    const post = (await request(app).get("/post")).body.data[0];
    comment.postId = post.id;

    controller.repository.create = jest
      .fn()
      .mockImplementationOnce(() => comment);
    const response = await request(app)
      .post(`/${routes.comment.basePath}`)
      .send(comment);
    expect(response.status).toBe(201);
  });

  // content validation
  test("failure 422 content empty", async () => {
    const post = (await request(app).get("/post")).body.data[0];
    comment.postId = post.id;

    controller.repository.create = jest
      .fn()
      .mockImplementationOnce(() => comment);
    const { content, ...testComment } = comment;
    const response = await request(app)
      .post(`/${routes.comment.basePath}`)
      .send({ ...testComment });
    expect(response.status).toBe(422);
  });
  test("failure 422 content length min", async () => {
    const post = (await request(app).get("/post")).body.data[0];
    comment.postId = post.id;

    controller.repository.create = jest
      .fn()
      .mockImplementationOnce(() => comment);
    const response = await request(app)
      .post(`/${routes.comment.basePath}`)
      .send({ ...comment, content: "f" });
    expect(response.status).toBe(422);
  });
  test("failure 422 content length max", async () => {
    const post = (await request(app).get("/post")).body.data[0];
    comment.postId = post.id;

    controller.repository.create = jest
      .fn()
      .mockImplementationOnce(() => comment);
    for (let i = 0; i < 189; i++) {
      comment.content = comment.content.concat("t");
    }
    const response = await request(app)
      .post(`/${routes.comment.basePath}`)
      .send(comment);
    expect(response.status).toBe(422);
  });

  // postId validation
  test("failure 422 postId empty", async () => {
    controller.repository.create = jest
      .fn()
      .mockImplementationOnce(() => comment);
    const response = await request(app)
      .post(`/${routes.comment.basePath}`)
      .send(comment);
    expect(response.status).toBe(422);
  });
});
