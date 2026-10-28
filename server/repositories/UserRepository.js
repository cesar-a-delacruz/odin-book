const Repository = require("./Repository");

module.exports = class UserRepository extends Repository {
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
    return await this.entity.model.findMany({ ...paginationProps });
  };
  findOne = async (id) => {
    return await this.entity.model.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            followers: true,
            followed: true,
            posts: true,
          },
        },
      },
    });
  };
};
