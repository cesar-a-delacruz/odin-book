const Repository = require("./Repository");

module.exports = class PostRepository extends Repository {
  findAll = async () => {
    return await this.entity.model.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      omit: { userId: true },
    });
  };
  findOne = async (id) => {
    return await this.entity.model.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      omit: { userId: true },
    });
  };
  findAllByUser = async (userId) => {
    return await this.entity.model.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      omit: { userId: true },
    });
  };
};
