// const jwt = require("jsonwebtoken");
// const AuthService = require("../services/AuthService");
// const userRepository = require("../repositories/index.js").user;
const dbConfig = require("../configs/dbConfig.js");

module.exports = async (req, res, next) => {
  // const accessToken = req.session.accessToken;
  // const refreshToken = req.session.refreshToken;

  // if (!refreshToken) res.sendStatus(401);
  // const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);

  // const user = await userRepository.findOne(payload.id);
  // if (!user) return res.sendStatus(403);
  // if (!accessToken) req.session.accessToken = AuthService.access(payload.id);

  // req.user = payload;
  const user = await dbConfig.user.findMany();
  req.user = user[0];
  next();
};
