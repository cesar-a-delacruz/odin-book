const CRUDController = require("./CRUDController");
const repositories = require("../repositories/index");

module.exports = {
  user: new CRUDController("user", repositories.user),
  post: new CRUDController("post", repositories.post),
  comment: new CRUDController("comment", repositories.comment),
  like: new CRUDController("like", repositories.like),
  follower: new CRUDController("follower", repositories.follower),
};
