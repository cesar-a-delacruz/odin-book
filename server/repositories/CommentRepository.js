const Repository = require("./Repository");

module.exports = class CommentRepository extends Repository {
  findAllByUser = async (userId, cursor) => {
    let paginationProps = { take: parseInt(process.env.PAGE_SIZE) };
    if (cursor)
      paginationProps = {
        ...paginationProps,
        cursor: {
          id: cursor,
        },
        skip: 1,
      };

    return await this.entity.model.findMany({
      ...paginationProps,
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      omit: { userId: true },
    });
  };
  findAllByPost = async (postId, cursor) => {
    let paginationProps = { take: parseInt(process.env.PAGE_SIZE) };
    if (cursor)
      paginationProps = {
        ...paginationProps,
        cursor: {
          id: cursor,
        },
        skip: 1,
      };

    return await this.entity.model.findMany({
      ...paginationProps,
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        userId: true,
      },
    });
  };
};
