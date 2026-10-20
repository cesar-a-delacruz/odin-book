const CRUDController = require("./CRUDController.js");

module.exports = class PostController extends CRUDController {
  findAllByUser = async (req, res) => {
    try {
      const rows = await this.repository.findAllByUser(req.params.userId);

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
};
