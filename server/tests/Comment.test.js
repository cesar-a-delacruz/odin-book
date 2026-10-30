const routes = require("../routes/index.js");
const controller = require("../controllers/index.js").comment;
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

for (const route in routes) {
  app.use(routes[route].router);
}

const findAllByUser = controller.repository.findAllByUser;
const findAllByPost = controller.repository.findAllByPost;
afterEach(() => {
  controller.repository.findAllByUser = findAllByUser;
  controller.repository.findAllByPost = findAllByPost;
});

describe("GET comment/user/:username", () => {
  test("success", async () => {
    const user = (await request(app).get("/user")).body.data[0];

    const response = await request(app).get(
      `/${routes.comment.basePath}/user/${user.username}`,
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
      `/${routes.comment.basePath}/user/${user.username}`,
    );
    expect(response.status).toBe(500);
  });
});

describe("GET comment/post/:postId", () => {
  test("success", async () => {
    const fourthPost = (await request(app).get("/post")).body.data[3];
    const eightpost = (await request(app).get(`/post?q=${fourthPost.id}`)).body
      .data[3];
    const post = (await request(app).get(`/post?q=${eightpost.id}`)).body
      .data[0];

    const response = await request(app).get(
      `/${routes.comment.basePath}/post/${post.id}`,
    );
    expect(response.status).toBe(200);
  });
  test("failure 500", async () => {
    const post = (await request(app).get("/post")).body.data[0];
    controller.repository.findAllByPost = jest
      .fn()
      .mockImplementationOnce(() => {
        throw Error;
      });
    const response = await request(app).get(
      `/${routes.comment.basePath}/post/${post.id}`,
    );
    expect(response.status).toBe(500);
  });
});
