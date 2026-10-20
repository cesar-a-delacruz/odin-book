const Router = require("./Router");
const controllers = require("../controllers/index");

module.exports = {
  user: new Router(controllers.user)
    .route("get", "findAll", "")
    .route("get", "findOne", ":id")
    .route("post", "create", "")
    .route("put", "update", ":id")
    .route("delete", "delete", ":id"),
  post: new Router(controllers.post)
    .route("get", "findAll", "")
    .route("get", "findOne", ":id")
    .route("post", "create", "")
    .route("put", "update", ":id")
    .route("delete", "delete", ":id"),
  comment: new Router(controllers.comment)
    .route("get", "findAll", "")
    .route("post", "create", "")
    .route("put", "update", ":id")
    .route("delete", "delete", ":id"),
  like: new Router(controllers.like)
    .route("post", "create", "")
    .route("delete", "delete", ":id"),
  follower: new Router(controllers.follower)
    .route("post", "create", "")
    .route("delete", "delete", ":id"),
};
