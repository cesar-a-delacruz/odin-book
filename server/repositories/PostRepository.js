const Repository = require("./Repository");

module.exports = class PostRepository extends Repository {
  findAll = async (cursor) => {
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
        id: "desc",
      },
      omit: { userId: true },
    });
  };
  findAllByUser = async (username, cursor) => {
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
      where: { user: { username: username } },
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
        id: "desc",
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
};
