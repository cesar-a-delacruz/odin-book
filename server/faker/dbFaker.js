const { faker } = require("@faker-js/faker");
const dataFakers = require("./dataFakers.js");

module.exports = async function () {
  faker.seed(12);
  const users = faker.helpers.multiple(
    (_, index) => dataFakers.userFaker(index),
    {
      count: 4,
    },
  );
  users[1].bio = null;

  const posts = faker.helpers.multiple(dataFakers.postFaker, { count: 9 });
  posts[1].image = null;

  const comments = faker.helpers.multiple(dataFakers.commentFaker, {
    count: 4,
  });

  return { users, posts, comments };
};
