const CRUDController = require("./CRUDController");
const PostController = require("./PostController");
const CommentController = require("./CommentController");
const UserController = require("./UserController");
const FollowerController = require("./FollowerController");
const repositories = require("../repositories/index");

module.exports = {
  user: new UserController("user", repositories.user),
  post: new PostController("post", repositories.post),
  comment: new CommentController("comment", repositories.comment),
  like: new CRUDController("like", repositories.like),
  follower: new FollowerController("follower", repositories.follower),
};
