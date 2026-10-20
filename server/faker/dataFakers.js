const { faker } = require("@faker-js/faker");
const { hashSync } = require("bcryptjs");

module.exports = {
  userFaker: function (index) {
    return {
      // id: faker.string.uuid(),
      // username: faker.internet.username(),
      // password: faker.internet.password(),
      fullname: faker.person.fullName(),
      username: `fakeuser${index}`,
      password: hashSync(`fakeuser${index}`),
      image: faker.image.url(),
      bio: faker.lorem.sentence(),
    };
  },
  postFaker: function () {
    return {
      // id: faker.string.uuid(),
      // createdAt: faker.date.anytime().toLocaleString(),
      // updatedAt: faker.date.anytime().toLocaleString(),
      content: faker.lorem.paragraph(),
      image: faker.image.url(),
      userId: null,
    };
  },
  commentFaker: function () {
    return {
      // id: faker.string.uuid(),
      // createdAt: faker.date.anytime().toLocaleString(),
      // updatedAt: faker.date.anytime().toLocaleString(),
      content: faker.lorem.sentence(),
      userId: null,
      postId: null,
    };
  },
};
