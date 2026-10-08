import { faker } from "@faker-js/faker";
import * as dataFakers from "./dataFakers";

export default async function () {
  faker.seed(12);
  const users = faker.helpers.multiple(dataFakers.userFaker, { count: 4 });

  const followers = [
    {
      id: users[3].id,
      userId: users[0].id,
    },
    {
      id: users[2].id,
      userId: users[0].id,
    },
    {
      id: users[1].id,
      userId: users[1].id,
    },
    {
      id: users[0].id,
      userId: users[2].id,
    },
  ];

  const posts = faker.helpers.multiple(dataFakers.postFaker, { count: 4 });

  posts[0].userId = users[0].id;
  posts[1].userId = users[0].id;
  posts[2].userId = users[1].id;
  posts[3].userId = users[2].id;
  posts[1].image = null;

  const likes = [
    {
      userId: users[3].id,
      postId: posts[0].id,
    },
    {
      userId: users[2].id,
      postId: posts[0].id,
    },
    {
      userId: users[1].id,
      postId: posts[1].id,
    },
    {
      userId: users[0].id,
      postId: posts[2].id,
    },
  ];

  const comments = faker.helpers.multiple(dataFakers.commentFaker, {
    count: 4,
  });

  comments[0].postId = posts[0].id;
  comments[1].postId = posts[0].id;
  comments[2].postId = posts[2].id;
  comments[3].postId = posts[3].id;

  comments[0].userId = users[0].id;
  comments[1].userId = users[0].id;
  comments[2].userId = users[2].id;
  comments[3].userId = users[3].id;

  return { users, posts, comments, likes, followers };
}
