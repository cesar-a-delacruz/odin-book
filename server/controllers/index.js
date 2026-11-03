const CRUDController = require("./CRUDController");
const PostController = require("./PostController");
const CommentController = require("./CommentController");
const UserController = require("./UserController");
const FollowerController = require("./FollowerController");
const repositories = require("../repositories/index");
const validators = require("../validators/index");

module.exports = {
  user: new UserController("user", repositories.user, validators.user),
  post: new PostController("post", repositories.post, validators.post),
  comment: new CommentController(
    "comment",
    repositories.comment,
    validators.comment,
  ),
  like: new CRUDController("like", repositories.like),
  follower: new FollowerController(
    "follower",
    repositories.follower,
    validators.follower,
  ),
};
