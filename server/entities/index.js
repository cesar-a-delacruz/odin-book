const Entity = require("./Entity");
const dbConfig = require("../configs/dbConfig");

module.exports = {
  user: new Entity(dbConfig.user, {
    username: "string",
    fullname: "string",
    password: "string",
    bio: "string",
    image: "string",
  }),
  post: new Entity(dbConfig.post, {
    content: "string",
    image: "string",
    createdAt: "date",
    updatedAt: "date",
    userId: "string",
  }),
  comment: new Entity(dbConfig.comment, {
    content: "string",
    createdAt: "date",
    updatedAt: "date",
    userId: "string",
    postId: "string",
  }),
  like: new Entity(dbConfig.like, {
    userId: "string",
    postId: "string",
  }),
  follower: new Entity(dbConfig.follower, {
    followerId: "string",
    userId: "string",
  }),
};
