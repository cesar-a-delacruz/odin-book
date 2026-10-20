const Repository = require("./Repository");

module.exports = class CommentRepository extends Repository {
  findAllByUser = async (userId) => {
    return await this.entity.model.findMany({
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
  findAllByPost = async (postId) => {
    return await this.entity.model.findMany({
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
