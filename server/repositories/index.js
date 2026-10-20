const Repository = require("./Repository");
const PostRepository = require("./PostRepository");
const CommentRepository = require("./CommentRepository");
const UserRepository = require("./UserRepository");
const entities = require("../entities/index");

module.exports = {
  user: new UserRepository(entities.user),
  post: new PostRepository(entities.post),
  comment: new CommentRepository(entities.comment),
  like: new Repository(entities.like),
  follower: new Repository(entities.follower),
};
