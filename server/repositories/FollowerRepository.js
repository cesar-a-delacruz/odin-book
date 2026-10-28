const Repository = require("./Repository");

module.exports = class FollowerRepository extends Repository {
  findAllByFollower = async (followerId, cursor) => {
    let paginationProps = { take: parseInt(process.env.PAGE_SIZE) };
    if (cursor)
      paginationProps = {
        ...paginationProps,
        cursor: {
          followerId_followedId: {
            followerId: followerId,
            followedId: cursor,
          },
        },
        skip: 1,
      };

    return (
      await this.entity.model.findMany({
        ...paginationProps,
        where: {
          followerId,
        },
        include: {
          followed: {
            omit: {
              fullname: true,
            },
          },
        },
        omit: {
          followerId: true,
          followedId: true,
        },
        orderBy: { followedId: "desc" },
      })
    ).map((f) => f.followed);
  };
};
