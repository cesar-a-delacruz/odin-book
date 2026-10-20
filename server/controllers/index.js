const CRUDController = require("./CRUDController");
const PostController = require("./PostController");
const CommentController = require("./CommentController");
const repositories = require("../repositories/index");

module.exports = {
  user: new CRUDController("user", repositories.user),
  post: new PostController("post", repositories.post),
  comment: new CommentController("comment", repositories.comment),
  like: new CRUDController("like", repositories.like),
  follower: new CRUDController("follower", repositories.follower),
};
