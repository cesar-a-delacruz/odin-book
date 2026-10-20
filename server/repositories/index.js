const Repository = require("./Repository");
const entities = require("../entities/index");

module.exports = {
  user: new Repository(entities.user),
  post: new Repository(entities.post),
  comment: new Repository(entities.comment),
  like: new Repository(entities.like),
  follower: new Repository(entities.follower),
};
