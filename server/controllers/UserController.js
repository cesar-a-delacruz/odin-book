const CRUDController = require("./CRUDController.js");

module.exports = class UserController extends CRUDController {
  findAll = async (req, res) => {
    try {
      const rows = await this.repository.findAll(req.query.q);

      if (!rows.length)
        return res
          .status(404)
          .json({ error: `No ${this.itemName} have been found.` })
          .end();

      console.table(rows);
      return res.status(200).json({ data: rows }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find any ${this.itemName}.` })
        .end();
    }
  };

  findOne = async (req, res) => {
    try {
      const username = req.params.username || req.user.username;
      const row = await this.repository.findOne(username);

      if (!row)
        return res
          .status(404)
          .json({ error: `This ${this.itemName} doesn't exists.`, data: row })
          .end();

      console.info(row);
      return res.status(200).json({ data: row }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find ${this.itemName}.` })
        .end();
    }
  };
};
