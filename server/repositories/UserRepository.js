const Repository = require("./Repository");

module.exports = class UserRepository extends Repository {
  findOne = async (id) => {
    return await this.entity.model.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            followers: true,
            users: true,
            posts: true,
          },
        },
      },
    });
  };
};
