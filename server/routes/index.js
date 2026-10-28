const Router = require("./Router");
const controllers = require("../controllers/index");
const authorizationMiddleware = require("../middlewares/authorizationMiddleware");

module.exports = {
  user: new Router(controllers.user)
    .route("get", "findAll", "")
    // .route("get", "findAllByFollower", "follower", authorizationMiddleware)
    .route("get", "findOne", ":id", authorizationMiddleware),
  // .route("post", "create", "")
  // .route("put", "update", ":id")
  // .route("delete", "delete", ":id"),
  post: new Router(controllers.post)
    .route("get", "findAll", "")
    .route("get", "findAllByUser", "user/:userId", authorizationMiddleware)
    .route("get", "findOne", ":id"),
  // .route("post", "create", "")
  // .route("put", "update", ":id")
  // .route("delete", "delete", ":id"),
  comment: new Router(controllers.comment)
    .route("get", "findAll", "")
    .route("get", "findAllByUser", "user/:userId", authorizationMiddleware)
    .route("get", "findAllByPost", "post/:postId"),
  // .route("post", "create", "")
  // .route("put", "update", ":id")
  // .route("delete", "delete", ":id"),
  like: new Router(controllers.like),
  // .route("post", "create", "")
  // .route("delete", "delete", ":id"),
  follower: new Router(controllers.follower).route(
    "get",
    "findAllByFollower",
    "",
    authorizationMiddleware,
  ),
  // .route("post", "create", "")
  // .route("delete", "delete", ":id"),
};
