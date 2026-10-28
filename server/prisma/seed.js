const dbConfig = require("../configs/dbConfig.js");
const dbFaker = require("../faker/dbFaker.js");

(async function main() {
  const db = await dbFaker();

  const users = await dbConfig.user.createManyAndReturn({ data: db.users });
  const followers = [
    {
      followerId: users[3].id,
      followedId: users[0].id,
    },
    {
      followerId: users[2].id,
      followedId: users[0].id,
    },
    {
      followerId: users[1].id,
      followedId: users[1].id,
    },
    {
      followerId: users[0].id,
      followedId: users[2].id,
    },
  ];
  await dbConfig.follower.createMany({ data: followers });

  db.posts[0].userId = users[0].id;
  db.posts[1].userId = users[0].id;
  db.posts[2].userId = users[1].id;
  db.posts[3].userId = users[2].id;
  db.posts[4].userId = users[0].id;
  db.posts[5].userId = users[0].id;
  db.posts[6].userId = users[1].id;
  db.posts[7].userId = users[2].id;
  db.posts[8].userId = users[2].id;

  const posts = await dbConfig.post.createManyAndReturn({ data: db.posts });
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
  await dbConfig.like.createMany({ data: likes });

  db.comments[0].postId = posts[0].id;
  db.comments[1].postId = posts[0].id;
  db.comments[2].postId = posts[2].id;
  db.comments[3].postId = posts[3].id;

  db.comments[0].userId = users[0].id;
  db.comments[1].userId = users[0].id;
  db.comments[2].userId = users[2].id;
  db.comments[3].userId = users[3].id;

  const comments = await dbConfig.comment.createManyAndReturn({
    data: db.comments,
  });
})()
  .then(async () => await dbConfig.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await dbConfig.$disconnect();
  });
